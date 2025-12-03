'use client'

import { useOptimistic, useTransition } from "react";
import { Heart, ThumbsDown } from "lucide-react";
import { toggleInteraction } from "@/server/actions/product-actions";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ProductCardProps = {
    product: any;
    initialInteraction: 'like' | 'dislike' | null;
};

export default function ProductCard({ product, initialInteraction }: ProductCardProps) {
    const [pending, startTransition] = useTransition();
    const [optimisticState, setOptimisticState] = useOptimistic(
        { interaction: initialInteraction },
        (state, newInteraction: 'like' | 'dislike') => ({
            interaction: state.interaction === newInteraction ? null : newInteraction
        })
    );

    const handleInteraction = (type: 'like' | 'dislike') => {
        startTransition(async () => {
            setOptimisticState(type);
            await toggleInteraction(product.id, type);
        });
    };

    return (
        <div className="group relative border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="aspect-square relative bg-gray-100">
                {product.images[0]?.url && (
                    <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                )}
            </div>

            <div className="p-4">
                <h3 className="font-semibold truncate">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.brand?.name}</p>
                <p className="mt-2 font-bold">${(product.sellingPrice / 100).toFixed(2)}</p>
            </div>

            <div className="absolute top-2 right-2 flex gap-2">
                <button
                    onClick={() => handleInteraction('like')}
                    className={cn(
                        "p-2 rounded-full bg-white/80 backdrop-blur-sm transition-colors",
                        optimisticState.interaction === 'like' ? "text-red-500" : "text-gray-600 hover:text-red-500"
                    )}
                >
                    <Heart className={cn("w-5 h-5", optimisticState.interaction === 'like' && "fill-current")} />
                </button>
            </div>
        </div>
    );
}