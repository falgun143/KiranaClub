"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
const axios_1 = __importDefault(require("axios"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
let port = 3000;
app.use(express_1.default.json());
app.post("/api/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    if (!("count" in payload) || !("visits" in payload)) {
        return res.status(400).send({ error: "Missing keys" });
    }
    else if (payload.count !== payload.visits.length) {
        return res
            .status(400)
            .send({ error: "Visits length should be equal to count" });
    }
    const jobId = (0, uuid_1.v4)();
    const createdJob = yield prisma.job.create({
        data: {
            id: jobId,
            status: "ongoing",
            visits: {
                create: payload.visits.map((visit) => ({
                    store_id: visit.store_id,
                    visit_time: visit.visit_time,
                })),
            },
        },
        include: {
            visits: true,
        },
    });
    console.log("Job processing started");
    const visitsWithImages = createdJob.visits.map((visit, index) => (Object.assign(Object.assign({}, visit), { image_url: payload.visits[index].image_url })));
    console.log(visitsWithImages);
    res.status(201).send({ job_id: jobId });
    yield processJob(jobId, visitsWithImages);
}));
app.get("/api/status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.query.jobid;
    const job = yield prisma.job.findUnique({
        where: { id: jobId },
        include: {
            visits: {
                include: {
                    images: true,
                },
            },
            error: true,
        },
    });
    if (!job) {
        return res.status(400).send({ error: "Job ID does not exist" });
    }
    if (job.status === "failed") {
        return res.status(400).send({
            status: job.status,
            job_id: job.id,
            error: job.error.map((err) => ({
                store_id: err.store_id,
                error: err.message,
            })),
        });
    }
    res.status(200).send({
        status: job.status,
        job_id: job.id,
    });
}));
function processJob(jobId, visits) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const visit of visits) {
                try {
                    for (const imageUrl of visit.image_url) {
                        const response = yield axios_1.default.get(imageUrl, {
                            responseType: "arraybuffer",
                        });
                        console.log(response.data);
                        const image = yield (0, sharp_1.default)(response.data);
                        const metadata = yield image.metadata();
                        const perimeter = 2 * (metadata.width + metadata.height);
                        yield new Promise((resolve) => setTimeout(resolve, Math.random() * 300 + 100));
                        yield prisma.image.create({
                            data: {
                                url: imageUrl,
                                perimeter,
                                visit: {
                                    connect: { id: visit.id },
                                },
                            },
                        });
                    }
                }
                catch (error) {
                    yield prisma.error.create({
                        data: {
                            store_id: visit.store_id,
                            message: "Image download failed",
                            job: {
                                connect: { id: jobId },
                            },
                        },
                    });
                }
            }
            const errorCount = yield prisma.error.count({
                where: { jobId },
            });
            if (errorCount > 0) {
                yield prisma.job.update({
                    where: { id: jobId },
                    data: { status: "failed" },
                });
            }
            else {
                yield prisma.job.update({
                    where: { id: jobId },
                    data: { status: "completed" },
                });
            }
            console.log("Job processing completed");
        }
        catch (error) {
            yield prisma.job.update({
                where: { id: jobId },
                data: {
                    status: "failed",
                },
            });
            yield prisma.error.create({
                data: {
                    store_id: "unknown",
                    message: "Unexpected error occurred",
                    job: {
                        connect: { id: jobId },
                    },
                },
            });
        }
    });
}
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
