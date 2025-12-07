'use client';

import { FeedItem } from "@/types/feed";
import { PinCard } from "./pin-card";

interface MasonryGridProps {
    items: FeedItem[];
}

export function MasonryGrid({ items }: MasonryGridProps) {
    if (!items || items.length === 0) {
        return (
            <div className="w-full h-64 flex items-center justify-center text-slate-400">
                محتوایی یافت نشد.
            </div>
        );
    }

    return (
        
        
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 mx-auto space-y-4 pb-20 px-2">
            {items.map((item, index) => (
                <PinCard
                    key={item.id}
                    item={item}
                    priority={index < 4} 
                />
            ))}
        </div>
    );
}