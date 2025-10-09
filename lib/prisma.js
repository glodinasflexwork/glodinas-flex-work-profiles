import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'

// Create a function to get Prisma client (supports both Node.js and Edge Runtime)
function getPrismaClient() {
  // Check if we're in Edge Runtime
  if (typeof EdgeRuntime !== 'undefined' || process.env.NEXT_RUNTIME === 'edge') {
    // Edge Runtime: Use Neon serverless adapter
    const connectionString = process.env.DATABASE_URL
    const pool = new Pool({ connectionString })
    const adapter = new PrismaNeon(pool)
    return new PrismaClient({ adapter })
  } else {
    // Node.js Runtime: Use standard Prisma Client
    return new PrismaClient()
  }
}

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global

export const prisma = globalForPrisma.prisma || getPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

