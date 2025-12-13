'use client'

import { useState, use } from "react";
import Link from "next/link";
import {
    ArrowRight,
    MoreHorizontal,
    Share2,
    UploadCloud,
    Link as LinkIcon,
    Search,
    Filter,
    Plus
} from "lucide-react";
import Image from "next/image";

// ایمپورت کامپوننت گرید اصلی برای هماهنگی با صفحه اکسپلور
import { MasonryGrid } from "@/components/feed/masonry-grid";
import { FeedItem } from "@/types/feed";

// لیست تصاویر برای تولید دیتای ساختگی (مشابه اکسپلور)
const MOCK_IMAGES = [
    "/1.jpeg", "/woman-3083453_1280.jpg", "/fashion-9464875_1920.jpg",
    "/balancing-1868051_1920.jpg", "/portrait-young-happy-woman-studio.jpg",
    "/woman-9554464_1920.jpg", "/attractive-stylish-blonde-woman-jeans-oversize-jacket-walking-against-wall-street.jpg",
    "/woman-716592_1280.jpg", "/man-9182458_1280.jpg", "/woman-8839452_1920.jpg"
];

export default function BoardDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // باز کردن پارامترها (در Next.js 15)
    const { id } = use(params);

    // تولید دیتای ساختگی مطابق با استاندارد FeedItem
    const [pins, setPins] = useState<FeedItem[]>(Array.from({ length: 15 }).map((_, i) => ({
        id: i + 1,
        title: `ایده استایل ${i + 1}`,
        imageUrl: MOCK_IMAGES[i % MOCK_IMAGES.length],
        // اضافه کردن اطلاعات کاربر برای سازگاری با تایپ FeedItem
        user: {
            name: `کاربر ${i + 1}`,
            avatar: MOCK_IMAGES[(i + 2) % MOCK_IMAGES.length]
        },
        likes: Math.floor(Math.random() * 500) + 10
    })));

    return (
        <div className="min-h-screen bg-white font-sans pb-20">

            {/* --- هدر شناور --- */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/boards" className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                            <ArrowRight className="w-6 h-6 text-slate-700" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-extrabold text-slate-900">استایل تابستانه</h1>
                            <p className="text-xs text-slate-500 font-medium">{pins.length} پین • خصوصی</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="p-2.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors" title="اشتراک‌گذاری">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">

                {/* --- تولبار فیلتر --- */}
                <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide px-2">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold shadow-md shadow-slate-200 shrink-0 hover:bg-slate-800 transition-colors">
                        <Filter className="w-4 h-4" />
                        همه پین‌ها
                    </button>
                    <button className="px-5 py-2.5 bg-white text-slate-600 hover:bg-slate-50 rounded-full text-sm font-bold border border-slate-200 shrink-0 transition-colors">
                        مرتب‌سازی
                    </button>
                    <button className="px-5 py-2.5 bg-white text-slate-600 hover:bg-slate-50 rounded-full text-sm font-bold border border-slate-200 shrink-0 transition-colors">
                        یادداشت‌ها
                    </button>
                </div>

                {/* --- استفاده از MasonryGrid مشابه صفحه اکسپلور --- */}
                <div className="animate-in fade-in zoom-in-95 duration-500 min-h-[400px]">
                    <MasonryGrid items={pins} />
                </div>

                {/* --- بخش افزودن محتوا (پاورقی) --- */}
                <div className="border-t border-slate-100 pt-10 mt-16 max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-extrabold text-slate-900">افزودن به بورد</h2>
                            <p className="text-sm text-slate-500 mt-1">ایده‌های جدید را به این مجموعه اضافه کنید</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* کارت آپلود فایل */}
                        <div className="group relative border-2 border-dashed border-slate-300 hover:border-purple-500 rounded-3xl bg-slate-50 hover:bg-purple-50/10 transition-all duration-300 p-8 flex flex-col items-center justify-center text-center cursor-pointer h-64">
                            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-purple-600 ring-1 ring-slate-100">
                                <UploadCloud className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 mb-1">آپلود تصویر یا ویدیو</h3>
                            <p className="text-sm text-slate-400 max-w-xs mx-auto">فایل‌ها را بکشید و رها کنید</p>
                        </div>

                        {/* کارت افزودن لینک */}
                        <div className="group relative border border-slate-200 rounded-3xl bg-white hover:shadow-xl hover:border-purple-200 transition-all duration-300 p-8 flex flex-col justify-center h-64">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <LinkIcon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-slate-800">ذخیره از وب‌سایت</h3>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="لینک (URL) را وارد کنید..."
                                    className="w-full h-14 pl-14 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-sans text-left dir-ltr"
                                />
                                <div className="absolute left-2 top-2 bottom-2">
                                    <button className="h-full px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-sm transition-colors">
                                        ذخیره
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* پیشنهادهای هوشمند */}
                    <div className="mt-16 opacity-80 hover:opacity-100 transition-opacity duration-500">
                        <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2 text-lg">
                            <Search className="w-5 h-5" />
                            پیشنهادات مرتبط برای شما
                        </h3>
                        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide px-1">
                            {[0, 1, 2, 3, 4].map((item) => (
                                <div key={item} className="w-52 shrink-0 aspect-[2/3] rounded-2xl bg-slate-200 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300">
                                    <Image src={MOCK_IMAGES[item % MOCK_IMAGES.length]} alt="" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                                        <button className="bg-white text-slate-900 rounded-full px-4 py-2 font-bold text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <Plus className="w-4 h-4" />
                                            افزودن
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}