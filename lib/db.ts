import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const connectionString = process.env.DATABASE_URL

// تنظیم Pool برای دیتابیس
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
        log: ['query'], // اگر نیاز به لاگ دارید آنکامنت کنید
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma