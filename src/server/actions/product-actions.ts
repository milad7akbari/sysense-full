'use server'

import { db } from "@/server/db";
import { productInteractions } from "@/server/db/schema";
import { getSession } from "@/lib/auth";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleInteraction(productId: string, type: 'like' | 'dislike') {
    const session = await getSession();
    if (!session?.sub) throw new Error("Unauthorized");

    const userId = session.sub;

    const existing = await db.query.productInteractions.findFirst({
        where: and(
            eq(productInteractions.userId, userId),
            eq(productInteractions.productId, productId)
        )
    });

    if (existing) {
        if (existing.interactionType === type) {
            // Toggle off (Remove)
            await db.delete(productInteractions)
                .where(and(
                    eq(productInteractions.userId, userId),
                    eq(productInteractions.productId, productId)
                ));
        } else {
            // Change type
            await db.update(productInteractions)
                .set({ interactionType: type })
                .where(and(
                    eq(productInteractions.userId, userId),
                    eq(productInteractions.productId, productId)
                ));
        }
    } else {
        // Create new
        await db.insert(productInteractions).values({
            userId,
            productId,
            interactionType: type
        });
    }

    // Revalidate feed to update personalized algorithms
    revalidatePath('/feed');
    return { success: true };
}