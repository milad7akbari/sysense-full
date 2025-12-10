'use client'

import { MasonryGrid } from "@/components/feed/masonry-grid";
import { FeedItem } from "@/types/feed";


const FEED_ITEMS: FeedItem[] = [
    { id: 101, imageUrl: "/1.jpeg", title: "استایل کلاسیک", user: { name: "ClassicMan" }, height: 'tall' },
    { id: 102, imageUrl: "/2.jpeg", title: "هنر دیجیتال", user: { name: "ArtistX" }, height: 'medium' },
    { id: 103, imageUrl: "/2.jpeg", title: "پرتره شهری", user: { name: "CityLens" }, height: 'short' },
    { id: 104, imageUrl: "/1.jpeg", title: "مدلینگ", user: { name: "ModelZ" }, height: 'tall' },
    { id: 105, imageUrl: "/2.jpeg", title: "عکاسی پرتره", user: { name: "PortraitPro" }, height: 'medium' },
    { id: 106, imageUrl: "/1.jpeg", title: "استایل شب", user: { name: "NightVibe" }, height: 'tall' },
    { id: 107, imageUrl: "/2.jpeg", title: "فشن مردانه", user: { name: "MenStyle" }, height: 'short' },
];

export default function HomePage() {
    return (
        <div className="max-w-[1600px] mx-auto min-h-screen">

            <div className="px-2 md:px-4 pt-4">
                <MasonryGrid items={FEED_ITEMS} />
            </div>
        </div>
    );
}