'use client'

import { useState, useEffect } from "react";
import {
    Sparkles,
    SlidersHorizontal,
    RefreshCcw,
    Brain,
    Zap,
    X,
    Check,
    ThumbsUp,
    MessageSquareQuote
} from "lucide-react";
import { MasonryGrid } from "@/components/feed/masonry-grid";
import { FeedItem } from "@/types/feed";

// --- تصاویر نمونه ---
const MOCK_IMAGES = [
    "/fashion-9464875_1920.jpg", "/1.jpeg", "/woman-3083453_1280.jpg",
    "/woman-9554464_1920.jpg", "/balancing-1868051_1920.jpg",
    "/portrait-young-happy-woman-studio.jpg", "/man-9182458_1280.jpg",
    "/woman-8839452_1920.jpg", "/attractive-stylish-blonde-woman-jeans-oversize-jacket-walking-against-wall-street.jpg",
    "/woman-716592_1280.jpg"
];

// تولید داده‌های ساختگی
const MOCK_PINS: FeedItem[] = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    title: `استایل پیشنهادی ${i + 1}`,
    imageUrl: MOCK_IMAGES[i % MOCK_IMAGES.length],
    user: {
        name: `AI Stylist`,
        avatar: "/vercel.svg" // آواتار هوش مصنوعی
    },
    likes: Math.floor(Math.random() * 90) + 85 // لایک‌های بالا برای نشان دادن دقت
}));

export default function HomePage() {
    const [isTuningOpen, setIsTuningOpen] = useState(false);
    const [mood, setMood] = useState("امروز");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleRegenerate = () => {
        setIsGenerating(true);
        setTimeout(() => setIsGenerating(false), 2500);
    };

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans pb-20">

            {/* --- هدر کنترل پنل هوش مصنوعی --- */}
                <div className="max-w-[1600px] mx-auto">

                    {/* ردیف بالا: خوش‌آمدگویی و ابزارها */}
                    <div className="flex flex-col md:flex-row items-center justify-between p-4 md:px-8 gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-200 shrink-0">
                                <Brain className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                                    دستیار هوشمند
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                </h1>
                                <p className="text-xs text-slate-500 font-medium">آماده‌سازی شده بر اساس فعالیت‌های ۲۴ ساعت گذشته</p>
                            </div>
                        </div>

                        {/* دکمه‌های کنترل */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <button
                                onClick={() => setIsTuningOpen(!isTuningOpen)}
                                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all ${isTuningOpen ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'}`}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                تنظیم دقیق
                            </button>
                            <button
                                onClick={handleRegenerate}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-50 text-violet-700 font-bold text-sm hover:bg-violet-100 transition-colors"
                            >
                                <RefreshCcw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                                {isGenerating ? 'در حال ساخت...' : 'پیشنهاد جدید'}
                            </button>
                        </div>
                    </div>

                    {/* ردیف پایین: تنظیمات پیشرفته (بازشو) */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isTuningOpen ? 'max-h-48 opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-4 md:px-8 bg-slate-50/50 flex flex-col md:flex-row gap-8 items-start">

                            {/* انتخاب مود */}
                            <div className="space-y-3 w-full md:w-auto">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">مود استایل امروز</span>
                                <div className="flex flex-wrap gap-2">
                                    {['رسمی و اداری', 'کژوال راحت', 'جسورانه', 'مینیمال'].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => setMood(item)}
                                            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${mood === item ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* فیلترهای هوشمند */}
                            <div className="space-y-3 flex-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">تمرکز هوش مصنوعی</span>
                                <div className="flex items-center gap-4 text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200 max-w-lg">
                                    <div className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-500" />
                                        <span>رنگ‌های روشن</span>
                                    </div>
                                    <div className="w-px h-4 bg-slate-200"></div>
                                    <div className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-500" />
                                        <span>پارچه‌های نخی</span>
                                    </div>
                                    <div className="w-px h-4 bg-slate-200"></div>
                                    <div className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-500" />
                                        <span>قیمت متوسط</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            {/* --- محتوای اصلی --- */}
            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-8 relative">

                {/* پیام شفافیت عملکرد (Context Bubble) */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-sm border border-slate-200/60 animate-in slide-in-from-top-4 duration-700">
                        <MessageSquareQuote className="w-5 h-5 text-violet-500" />
                        <p className="text-sm text-slate-600">
                            <span className="font-bold text-slate-800">چرا این‌ها؟</span> چون دیشب کالکشن «تابستانه زارا» را ذخیره کردید.
                        </p>
                    </div>
                </div>

                {isGenerating ? (
                    // لودینگ پیشرفته
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="relative w-24 h-24 mb-6">
                            <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-violet-600 border-t-transparent animate-spin"></div>
                            <Brain className="absolute inset-0 m-auto w-8 h-8 text-violet-600 animate-pulse" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">در حال آنالیز سلیقه شما...</h3>
                        <p className="text-slate-500 text-sm">بررسی ۳۰۰۰+ آیتم جدید</p>
                    </div>
                ) : (
                    // گرید
                    <div className="animate-in fade-in zoom-in-95 duration-700">
                        {/* ترفند برای نمایش درصد تطابق روی گرید استاندارد:
                            چون MasonryGrid کامپوننت داخلی است، ما یک لایه راهنما بالای آن می‌گذاریم
                            یا در نسخه واقعی باید پراپ children قبول کند.
                            در اینجا فرض می‌کنیم گرید همان استایل استاندارد را دارد.
                        */}
                        <MasonryGrid items={MOCK_PINS} />
                    </div>
                )}
            </main>

            {/* --- دکمه شناور بازخورد --- */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
                <div className="bg-slate-900 text-white text-xs font-bold py-1 px-3 rounded-lg shadow-lg mb-1 animate-bounce">
                    این لیست چطور بود؟
                </div>
                <div className="flex gap-2">
                    <button className="w-12 h-12 rounded-full bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 shadow-lg border border-slate-100 flex items-center justify-center transition-all hover:scale-110">
                        <X className="w-6 h-6" />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-violet-600 text-white shadow-lg shadow-violet-200 flex items-center justify-center transition-all hover:scale-110 hover:bg-violet-700">
                        <ThumbsUp className="w-6 h-6" />
                    </button>
                </div>
            </div>

        </div>
    );
}