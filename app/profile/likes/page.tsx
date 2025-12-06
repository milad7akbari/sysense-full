"use client";

import { useState } from "react";
import { Heart, MoreHorizontal, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import Image from 'next/image';
const initialItems = [
    {
        id: 1,
        title: "استایل مینیمال تابستانی",
        category: "روزمره",
        price: "۱,۲۰۰,۰۰۰ تومان",
        image: "/1.jpeg",
    },
    {
        id: 2,
        title: "کت چرم کلاسیک",
        category: "زمستانه",
        price: "۴,۵۰۰,۰۰۰ تومان",
        image: "/2.jpeg",
    },
];

export default function LikesPage() {
    const [items, setItems] = useState(initialItems);

    const handleRemove = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                    <Heart className="w-10 h-10 text-slate-300" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">لیست علاقه‌مندی‌ها خالی است</h2>
                <p className="text-slate-500 max-w-xs mx-auto">
                    به نظر می‌رسد هنوز آیتمی را به لیست خود اضافه نکرده‌اید.
                </p>
                <button className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm font-medium">
                    مشاهده فروشگاه
                    <ArrowLeft className="w-4 h-4" />
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-4 sm:p-6 max-w-7xl mx-auto" dir="rtl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        مورد علاقه‌ها
                    </h1>
                    <p className="text-sm text-slate-500 mt-2">
                        مدیریت محصولاتی که برای خرید ذخیره کرده‌اید
                    </p>
                </div>
                <div className="bg-rose-50 text-rose-600 px-5 py-2.5 rounded-2xl flex items-center gap-2 font-bold text-sm shadow-sm ring-1 ring-rose-100">
                    <Heart className="w-5 h-5 fill-current" />
                    <span>{items.length} محصول</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="group bg-white rounded-3xl p-3 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-500 flex flex-col"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 mb-4">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />

                            {/* Overlay Actions */}
                            <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white transition-all shadow-sm hover:shadow-md"
                                    title="حذف از لیست"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="absolute bottom-3 left-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                                <button className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors shadow-lg">
                                    <ShoppingBag className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="px-1 pb-2 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <p className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md inline-block">
                                        {item.category}
                                    </p>
                                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>
                                <h3 className="font-bold text-slate-800 text-base line-clamp-1 mb-1">
                                    {item.title}
                                </h3>
                            </div>

                            <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {item.price}
                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}