'use client'

import { useState } from "react";
import { MasonryGrid } from "@/components/feed/masonry-grid";
import { FeedItem } from "@/types/feed";

// داده‌های فید شخصی (متفاوت از اکسپلور)
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
    const [activeTab, setActiveTab] = useState<"foryou" | "following">("foryou");

    return (
        <div className="max-w-[1600px] mx-auto min-h-screen">

            {/* Tab Switcher - Pinterest Style */}
            <div className="sticky top-[80px] z-20 bg-white/95 backdrop-blur-sm py-4 mb-2 flex justify-center gap-6">
                <button
                    onClick={() => setActiveTab("foryou")}
                    className={`text-base font-bold px-4 py-2 rounded-full transition-all ${
                        activeTab === 'foryou'
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    برای شما
                </button>
                <button
                    onClick={() => setActiveTab("following")}
                    className={`text-base font-bold px-4 py-2 rounded-full transition-all ${
                        activeTab === 'following'
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    دنبال‌می‌کنید
                </button>
            </div>

            {/* Reusable Masonry Grid */}
            <div className="px-2 md:px-4 pt-4">
                <MasonryGrid items={FEED_ITEMS} />
            </div>
        </div>
    );
}