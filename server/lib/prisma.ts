import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT) || 6033,
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "hunter2",
  database: process.env.DATABASE_NAME || "finansai",
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

export { prisma };

// DATABASE_URL="mysql://root:hunter2@localhost:6033/finansai"
// DATABASE_USER="root"
// DATABASE_PASSWORD="hunter2"
// DATABASE_NAME="mydb"
// DATABASE_HOST="localhost"
// DATABASE_PORT=3306