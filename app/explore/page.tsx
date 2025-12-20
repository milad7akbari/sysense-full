'use client'

import { useState, useEffect, useCallback, useRef } from "react";
import { MasonryGrid } from "@/components/feed/masonry-grid";
import { FeedItem } from "@/types/feed";
import { getProductsAction } from "@/server/actions/product-actions";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Loader2,
    Search,
    Compass
} from "lucide-react";

const PAGE_SIZE = 20;
const INFINITE_LIMIT = 10;

export default function ExplorePage() {
    const [pins, setPins] = useState<FeedItem[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [scrollCount, setScrollCount] = useState(0);
    const [isInfiniteMode, setIsInfiniteMode] = useState(true);

    const observerTarget = useRef(null);

    const loadData = useCallback(async (targetPage: number, append: boolean = true) => {
        setLoading(true);
        const { items, totalPages: total } = await getProductsAction(targetPage, PAGE_SIZE);

        setTotalPages(total);
        if (append) {
            setPins(prev => [...prev, ...items]);
        } else {
            setPins(items);
            if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        loadData(1);
    }, [loadData]);

    useEffect(() => {
        if (!isInfiniteMode || loading) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && scrollCount < INFINITE_LIMIT) {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    setScrollCount(prev => prev + 1);
                    loadData(nextPage, true);

                    if (scrollCount + 1 >= INFINITE_LIMIT) {
                        setIsInfiniteMode(false);
                    }
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [isInfiniteMode, loading, page, scrollCount, loadData]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            loadData(newPage, false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] pb-20 font-sans">
            {/* هدر مخصوص صفحه Explore */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-violet-100 rounded-xl">
                            <Compass className="w-6 h-6 text-violet-600" />
                        </div>
                        <h1 className="text-xl font-extrabold text-slate-900">کاوش استایل‌ها</h1>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="جستجوی برند، لباس یا استایل..."
                            className="w-full pr-10 pl-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-violet-500 transition-all"
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">
                {/* گرید محصولات */}
                <div className="animate-in fade-in duration-700">
                    <MasonryGrid items={pins} />
                </div>

                {/* لودینگ اسکرول */}
                {isInfiniteMode && (
                    <div ref={observerTarget} className="h-20 flex items-center justify-center mt-10">
                        {loading && (
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
                                <span className="text-xs text-slate-400 font-medium">در حال بارگذاری موارد بیشتر...</span>
                            </div>
                        )}
                    </div>
                )}

                {/* پنل صفحه‌بندی کلاسیک */}
                {!isInfiniteMode && !loading && (
                    <div className="mt-20 flex flex-col items-center gap-6 py-10 border-t border-slate-100">
                        <div className="text-sm font-medium text-slate-500">
                            نمایش صفحه <span className="text-slate-900 font-bold">{page}</span> از کل <span className="text-slate-900 font-bold">{totalPages}</span> صفحه
                        </div>

                        <div className="flex items-center gap-2">
                            <PaginationButton
                                onClick={() => handlePageChange(1)}
                                disabled={page === 1}
                                icon={<ChevronsRight className="w-4 h-4" />}
                            />

                            <PaginationButton
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                icon={<ChevronRight className="w-4 h-4" />}
                            />

                            <div className="flex items-center gap-1 mx-4">
                                {page > 2 && <span className="text-slate-300 mx-1">...</span>}
                                {page > 1 && (
                                    <button onClick={() => handlePageChange(page - 1)} className="w-10 h-10 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                                        {page - 1}
                                    </button>
                                )}
                                <button className="w-12 h-12 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-xl shadow-slate-200 transform scale-110">
                                    {page}
                                </button>
                                {page < totalPages && (
                                    <button onClick={() => handlePageChange(page + 1)} className="w-10 h-10 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                                        {page + 1}
                                    </button>
                                )}
                                {page < totalPages - 1 && <span className="text-slate-300 mx-1">...</span>}
                            </div>

                            <PaginationButton
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                                icon={<ChevronLeft className="w-4 h-4" />}
                            />

                            <PaginationButton
                                onClick={() => handlePageChange(totalPages)}
                                disabled={page === totalPages}
                                icon={<ChevronsLeft className="w-4 h-4" />}
                            />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

function PaginationButton({ onClick, disabled, icon }: { onClick: () => void, disabled: boolean, icon: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
        >
            {icon}
        </button>
    );
}