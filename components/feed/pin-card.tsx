'use client';

import { useState } from "react";
import { Share2, MoreHorizontal, ArrowUpRight, Download } from "lucide-react";
import { FeedItem } from "@/types/feed";
import { cn } from "@/lib/utils";

interface PinCardProps {
    item: FeedItem;
    priority?: boolean;
}

export function PinCard({ item, priority = false }: PinCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const heightClass = item.height === 'tall' ? 'aspect-[3/5]' : item.height === 'short' ? 'aspect-[4/3]' : 'aspect-[3/4]';

    return (
        <div
            className="relative mb-4 break-inside-avoid group rounded-2xl overflow-hidden cursor-zoom-in"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            
            <div className={cn("relative w-full bg-slate-200", !item.imageUrl && heightClass)}>
                <img
                    src={item.imageUrl}
                    alt={item.title || "Pin image"}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={priority ? "eager" : "lazy"}
                />

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">

                
                <div className="flex justify-end">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-red-700 transition-colors shadow-sm">
                        ذخیره
                    </button>
                </div>

                
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white text-slate-800 transition-colors shadow-sm">
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                        <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white text-slate-800 transition-colors shadow-sm">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white text-slate-800 transition-colors shadow-sm">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white text-slate-800 transition-colors shadow-sm">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            
            {item.title && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <p className="text-xs font-medium line-clamp-1 truncate">{item.title}</p>
                    {item.user && (
                        <div className="flex items-center gap-1.5 mt-1">
                            {item.user.avatar ? (
                                <img src={item.user.avatar} className="w-4 h-4 rounded-full" alt={item.user.name} />
                            ) : (
                                <div className="w-4 h-4 rounded-full bg-slate-400" />
                            )}
                            <span className="text-[10px] opacity-90">{item.user.name}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}