# KiranaClub Backend Assignment 🛒

## 📋 Overview

This is the assignment given by KiranaClub. This is a platform to manage store visits and image processing.

## 🛠️ Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **Prisma**: ORM for database management
- **SuperBase**: Relational database
- **TypeScript**: Typed superset of JavaScript
- **Sharp**: High-performance image processing library
- **UUID**: Library for generating unique identifiers

## 🎬 Demo Video
https://github.com/user-attachments/assets/59fc014d-38f1-4d98-8025-abfdb374cde7

## 🚀 Quick Start

### Development Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/falgun143/KiranaClub.git
   cd KiranaClub
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```


3. **Run migrations:**

     All then db connection strings are already hardcoded for the ease of testing

   ```bash
   npx prisma migrate dev
   ```

4. **Compile TypeScript files:**

   ```bash
    tsc
   ```

5. **Navigate to the API folder:**

   ```bash
   cd dist
   ```

6. **Run the server:**

   ```bash
   node server.js
   ```

7. **Use Postman to test the APIs:**

   - Submit API: `POST http://localhost:3000/api/submit`
   - Status API: `GET http://localhost:3000/api/status/?jobid={job_id}`

### 🐳 Docker Setup

1. **Build the Docker image:**

   ```bash
   docker build -t kiranaclub-backend .
   ```

2. **Run the Docker container:**

   ```bash
   docker run -p 3000:3000 --env-file .env kiranaclub-backend
   ```



## 💻 Work Environment

- **Computer/Operating System:** Windows 11 / macOS / Linux
- **Text Editor/IDE:** Visual Studio Code
- **Libraries:** Node.js, Express, Prisma, Sharp, UUID

## 📈 Improvements

Given more time, I would integrate scaling using the concept of message queues with BullMQ (Node.js queue library) and Redis Cloud for handling data.

## 📄 Assumptions

- The database schema is predefined and migrations are managed using Prisma.


## 📚 Project Structure

- **api/**: Contains the server code.
  - `server.ts`: Main server file.
- **prisma/**: Contains Prisma schema and migrations.
  - `schema.prisma`: Prisma schema file.
- **.env**: Environment variables file.
- **package.json**: Project dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file.

## 🙏 Acknowledgments

- Prisma team for the ORM.
- Express team for the web framework.
- Sharp team for the image processing library.
- UUID team for the unique identifier library.
