import { db } from "@/server/db";
import { products, productInteractions, collectionPins, collections } from "@/server/db/schema";
import { eq, inArray, notInArray, desc, sql } from "drizzle-orm";
import { cache } from "react";

// Cached for request deduplication
export const getFeed = cache(async (userId?: string) => {
    if (!userId) {
        // Guest Feed: Simple latest 20
        return await db.query.products.findMany({
            limit: 20,
            orderBy: [desc(products.createdAt)],
            with: {
                images: true,
                brand: true,
                seller: true
            }
        });
    }

    // Personalized Feed Logic (Ported from Python)
    // 1. Get IDs the user has already interacted with
    const interactions = await db.select({ pid: productInteractions.productId })
        .from(productInteractions)
        .where(eq(productInteractions.userId, userId));

    const excludedIds = interactions.map(i => i.pid);

    // 2. Main Query (Simplified for example, would use complex SQL builder for brand affinity matching)
    // In production Drizzle, we might use sql`` template for the complex affinity logic

    const feed = await db.query.products.findMany({
        limit: 20,
        where: excludedIds.length > 0 ? notInArray(products.id, excludedIds) : undefined,
        orderBy: [desc(products.createdAt)], // Replace with algorithm sort
        with: {
            images: true,
            brand: true,
            seller: true
        }
    });

    return feed;
});

export const getUserInteractions = cache(async (userId: string) => {
    return await db.query.productInteractions.findMany({
        where: eq(productInteractions.userId, userId)
    });
});