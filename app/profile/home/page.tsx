'use client'

import { MasonryGrid } from "@/components/feed/masonry-grid";
import { FeedItem } from "@/types/feed";


const FEED_ITEMS: FeedItem[] = [
    { id: 101, imageUrl: "/1.jpeg", title: "استایل کلاسیک", user: { name: "ClassicMan" }, height: "tall" },
    { id: 102, imageUrl: "/2.jpeg", title: "هنر دیجیتال", user: { name: "ArtistX" }, height: "medium" },
    { id: 103, imageUrl: "/attractive-stylish-blonde-woman-jeans-oversize-jacket-walking-against-wall-street.jpg", title: "پرتره شهری", user: { name: "CityLens" }, height: "short" },
    { id: 104, imageUrl: "/balancing-1868051_1920.jpg", title: "مدلینگ", user: { name: "ModelZ" }, height: "tall" },
    { id: 105, imageUrl: "/fashion-9464875_1920.jpg", title: "عکاسی پرتره", user: { name: "PortraitPro" }, height: "medium" },
    { id: 106, imageUrl: "/man-9182458_1280.jpg", title: "استایل شب", user: { name: "NightVibe" }, height: "tall" },
    { id: 107, imageUrl: "/portrait-young-happy-woman-studio.jpg", title: "فشن مردانه", user: { name: "MenStyle" }, height: "short" },
    { id: 108, imageUrl: "/woman-3083453_1280.jpg", title: "استایل خیابانی", user: { name: "StreetArt" }, height: "medium" },
    { id: 109, imageUrl: "/woman-716592_1280.jpg", title: "چهره هنری", user: { name: "PhotoCraft" }, height: "short" },
    { id: 110, imageUrl: "/woman-8839452_1920.jpg", title: "پرتره حرفه‌ای", user: { name: "FocusPro" }, height: "tall" },
    { id: 111, imageUrl: "/woman-9554464_1920.jpg", title: "فشن زنانه", user: { name: "Elegance" }, height: "medium" }
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