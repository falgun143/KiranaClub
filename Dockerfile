# Use the official Node.js image as the base image
FROM node:20-alpine    

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the TypeScript code
RUN npx tsc

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "dist/server.js"]