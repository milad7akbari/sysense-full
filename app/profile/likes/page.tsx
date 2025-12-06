import { Heart, Share2, MoreHorizontal } from "lucide-react";
import Image from "next/image";

const likedItems = [
    { id: 1, title: "استایل مینیمال تابستانی", category: "روزمره", image: "/window.svg" },
    { id: 2, title: "کت چرم کلاسیک", category: "زمستانه", image: "/globe.svg" },
    { id: 3, title: "ست ورزشی آبی", category: "اسپرت", image: "/file.svg" },
    { id: 4, title: "کفش‌های رانینگ", category: "کفش", image: "/vercel.svg" },
];

export default function LikesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">مورد علاقه‌ها</h1>
                    <p className="text-sm text-slate-400 mt-1">لیست آیتم‌هایی که پسندیده‌اید</p>
                </div>
                <div className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm">
                    <Heart className="w-4 h-4 fill-current" />
                    <span>{likedItems.length} آیتم</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {likedItems.map((item) => (
                    <div key={item.id} className="group bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_5px_20px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-all duration-300">
                        <div className="relative aspect-square rounded-2xl bg-slate-50 overflow-hidden mb-4 flex items-center justify-center">
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={64}
                                height={64}
                                className="opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                            />
                            <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white transition-colors shadow-sm opacity-0 group-hover:opacity-100">
                                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                            </button>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <h3 className="font-bold text-slate-800 text-sm truncate">{item.title}</h3>
                                <p className="text-xs text-slate-400 mt-0.5">{item.category}</p>
                            </div>
                            <button className="text-slate-300 hover:text-slate-600 transition-colors">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}