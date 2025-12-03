import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
}

// Global caching to prevent connection exhaustion in development (Hot Reload)
const globalForDb = globalThis as unknown as {
    conn: postgres.Sql | undefined;
};

// Reuse existing connection if available, otherwise create new one
const client = globalForDb.conn ?? postgres(connectionString, { prepare: false });

// Save connection to global in development
if (process.env.NODE_ENV !== "production") globalForDb.conn = client;

export const db = drizzle(client, { schema });

// DTO Types derived from Schema
export type User = typeof schema.users.$inferSelect;
export type Product = typeof schema.products.$inferSelect;
export type ProductWithDetails = Product & {
    images: typeof schema.productImages.$inferSelect[];
    brand: typeof schema.brands.$inferSelect | null;
    seller: User;
};