import { PinCard } from "./pin-card";
import { FeedItem } from "@/types/feed";

interface MasonryGridProps {
    items: FeedItem[];
}

export function MasonryGrid({ items }: MasonryGridProps) {
    return (
        <div className="w-full mx-auto">
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
                {items.map((item) => (
                    <div key={item.id} className="break-inside-avoid mb-4">
                        <PinCard data={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}