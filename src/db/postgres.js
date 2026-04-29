import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL || "postgresql://postgres:postgres@localhost:5432/visitalaslajas",
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

export default pool
