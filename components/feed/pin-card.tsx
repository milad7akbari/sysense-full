import { FeedItem } from "@/types/feed";
import { Heart, Download } from "lucide-react";

export function PinCard({ data }: { data: FeedItem }) {
    return (
        <div className="group relative rounded-[16px] overflow-hidden cursor-zoom-in bg-gray-100 dark:bg-gray-800">
            {/* تصویر اصلی */}
            <div className="relative w-full">
                <img
                    src={data.imageUrl}
                    alt={data.title || "Pin image"}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* لایه تاریک روی عکس در حالت هاور (برای شبیه شدن به پینترست) */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* دکمه‌های اکشن (بالا سمت راست) - فقط در حالت هاور دیده می‌شوند */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-10">
                <button className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-red-700 transition-colors">
                    Save
                </button>
            </div>

            {/* دکمه‌های اکشن (پایین سمت راست) */}
            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-10">
                <button className="bg-white/90 p-2 rounded-full hover:bg-white text-gray-800 shadow-sm transition-colors">
                    <Download className="w-4 h-4" />
                </button>
                <button className="bg-white/90 p-2 rounded-full hover:bg-white text-gray-800 shadow-sm transition-colors">
                    <Heart className="w-4 h-4" />
                </button>
            </div>

            {/* اطلاعات کاربر و عنوان (پایین سمت چپ) */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end text-right">
                {data.title && (
                    <h3 className="text-white font-medium text-sm truncate mb-1 drop-shadow-md">
                        {data.title}
                    </h3>
                )}

                {data.user && (
                    <div className="flex items-center gap-2 justify-end md:justify-start">
                        {data.user.avatar && (
                            <img
                                src={data.user.avatar}
                                alt={data.user.name}
                                className="w-6 h-6 rounded-full object-cover border border-white/50"
                            />
                        )}
                        <span className="text-xs text-gray-100 font-light drop-shadow-md">
                            {data.user.name}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}