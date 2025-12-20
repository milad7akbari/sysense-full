"use server"

import { prisma } from "@/lib/db";
import { FeedItem } from "@/types/feed";

export async function getProductsAction(page: number = 1, pageSize: number = 20) {
    try {
        const skip = (page - 1) * pageSize;

        const totalCount = await prisma.product.count({ where: { active: true } });

        const products = await prisma.product.findMany({
            where: { active: true },
            skip: skip,
            take: pageSize,
            include: {
                user: { select: { firstName: true, lastName: true, avatar: true } },
                _count: { select: { likes: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        const items: FeedItem[] = products.map(p => ({
            id: p.id,
            imageUrl: p.imageUrl,
            title: p.title || "",
            user: {
                name: `${p.user.firstName || ''} ${p.user.lastName || ''}`.trim() || "کاربر",
                avatar: p.user.avatar || undefined
            },
            likes: p._count.likes,
            height: p.height > p.width ? 'tall' : 'medium'
        }));

        return {
            items,
            totalPages: Math.ceil(totalCount / pageSize),
            totalCount
        };
    } catch (error) {
        console.error("Error:", error);
        return { items: [], totalPages: 0, totalCount: 0 };
    }
}