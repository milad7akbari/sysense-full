'use client'

import { useState } from "react";
import { Search } from "lucide-react";
import { MasonryGrid } from "@/components/feed/masonry-grid";
import { FeedItem } from "@/types/feed";


const EXPLORE_ITEMS: FeedItem[] = [
    { id: 1, imageUrl: "/1.jpeg", title: "استایل مینیمال", user: { name: "Sara" }, height: 'tall' },
    { id: 2, imageUrl: "/2.jpeg", title: "تکنولوژی روز", user: { name: "TechMag" }, height: 'short' },
    { id: 3, imageUrl: "/1.jpeg", title: "طبیعت بکر", user: { name: "NatureLovers" }, height: 'medium' },
    { id: 4, imageUrl: "/1.jpeg", title: "کفش ورزشی", user: { name: "NikeFan" }, height: 'tall' },
    { id: 5, imageUrl: "/2.jpeg", title: "نوشیدنی خنک", user: { name: "CafeTime" }, height: 'medium' },
    { id: 6, imageUrl: "/1.jpeg", title: "معماری مدرن", user: { name: "ArchDaily" }, height: 'short' },
    { id: 7, imageUrl: "/2.jpeg", title: "مد و فشن", user: { name: "Vogue" }, height: 'tall' },
    { id: 8, imageUrl: "/2.jpeg", title: "لباس زرد", user: { name: "ColorPop" }, height: 'medium' },
    { id: 9, imageUrl: "/2.jpeg", title: "خرید آنلاین", user: { name: "ShopNow" }, height: 'tall' },
];

const CATEGORIES = ["همه", "فشن", "تکنولوژی", "طبیعت", "حیوانات", "معماری", "هنر", "غذا", "ماشین", "سفر"];

export default function ExplorePage() {
    const [activeCat, setActiveCat] = useState("همه");

    return (
        <div className="max-w-[1600px] mx-auto min-h-screen">

            <div className="sticky top-[80px] z-30 bg-white/95 backdrop-blur-xl pt-4 pb-2 mb-6">
                <div className="px-4 md:px-8 mb-4 max-w-2xl mx-auto">
                    <div className="relative group">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-slate-800 transition-colors" />
                        <input
                            type="text"
                            placeholder="جستجو برای ایده‌های جدید..."
                            className="w-full bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-slate-800 rounded-full py-3.5 pr-12 pl-4 outline-none border-2 border-transparent focus:border-slate-200 focus:shadow-lg transition-all"
                        />
                    </div>
                </div>

                
                <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 md:px-8 pb-2">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCat(cat)}
                            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${
                                activeCat === cat
                                    ? "bg-slate-900 text-white shadow-md transform scale-105"
                                    : "bg-slate-50 text-slate-600 hover:bg-slate-200"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            
            <div className="px-2 md:px-4">
                <MasonryGrid items={EXPLORE_ITEMS} />
            </div>
        </div>
    );
}