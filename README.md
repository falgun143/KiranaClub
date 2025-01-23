# KiranaClub Backend 🛒

## 📋 Overview

This project is the backend service for KiranaClub, a platform to manage store visits and image processing. It is built using Node.js, Express, and Prisma ORM with a PostgreSQL database.

## 🛠️ Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **Prisma**: ORM for database management
- **PostgreSQL**: Relational database
- **TypeScript**: Typed superset of JavaScript
- **Sharp**: High-performance image processing library
- **UUID**: Library for generating unique identifiers

## 🚀 Quick Start

### Development Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/kiranaclub_be.git
   cd kiranaclub_be
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the database:**

   - Ensure you have PostgreSQL installed and running.
   - Create a `.env` file in the root directory and add your database URL:
     ```
     DATABASE_URL="postgresql://user:password@localhost:5432/kiranaclub"
     ```

4. **Run migrations:**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

### Testing Instructions

1. **Compile TypeScript files:**
   ```bash
    tsc
   ```
2. **Compile TypeScript files:**

   ```bash
    cd api 
   ```

3. **Run the server:**
   ```bash
   node server.js
   ```

## 💻 Work Environment

- **Computer/Operating System:** Windows 11 / macOS / Linux
- **Text Editor/IDE:** Visual Studio Code
- **Libraries:** Node.js, Express, Prisma, Sharp, UUID

## 📈 Improvements

Given more time, I would integrate scaling using the concept of message queues with BullMQ (Node.js queue library) and Redis Cloud for handling data.

## 📄 Assumptions

- The database schema is predefined and migrations are managed using Prisma.
- The environment variables are correctly set up in the `.env` file.
- The project is run in a development environment with Node.js and PostgreSQL installed.

## 📚 Project Structure

- **api/**: Contains the server code.
  - `server.ts`: Main server file.
- **prisma/**: Contains Prisma schema and migrations.
  - `schema.prisma`: Prisma schema file.
  - `migrations/`: Directory for database migrations.
- **.env**: Environment variables file.
- **package.json**: Project dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file.

## 🙏 Acknowledgments

- Prisma team for the ORM.
- Express team for the web framework.
- Sharp team for the image processing library.
- UUID team for the unique identifier library.
