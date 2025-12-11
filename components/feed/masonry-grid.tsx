"use client";

import { useEffect, useState } from "react";
import { PinCard } from "./pin-card";
import { FeedItem } from "@/types/feed";

interface MasonryGridProps {
    items: FeedItem[];
}

export function MasonryGrid({ items }: MasonryGridProps) {
    const [columns, setColumns] = useState<FeedItem[][]>([]);

    useEffect(() => {
        function calculateColumns() {
            const width = window.innerWidth;
            let colCount = 2; // پیش‌فرض موبایل

            if (width >= 768) colCount = 3;  // md
            if (width >= 1024) colCount = 4; // lg

            const cols: FeedItem[][] = Array.from({ length: colCount }, () => []);

            items.forEach((item, index) => {
                cols[index % colCount].push(item);
            });

            setColumns(cols);
        }

        // محاسبه اولیه
        calculateColumns();

        // محاسبه مجدد هنگام تغییر سایز صفحه
        window.addEventListener("resize", calculateColumns);
        return () => window.removeEventListener("resize", calculateColumns);
    }, [items]);

    // نمایش یک لودینگ یا فضای خالی تا قبل از محاسبه ستون‌ها
    if (columns.length === 0) {
        return <div className="w-full h-screen animate-pulse bg-gray-50/50"></div>;
    }

    return (
        <div className="flex gap-4 w-full mx-auto items-start">
            {/* رندر کردن ستون‌ها در کنار هم */}
            {columns.map((colItems, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-4 flex-1">
                    {colItems.map((item) => (
                        <PinCard key={item.id} data={item} />
                    ))}
                </div>
            ))}
        </div>
    );
}