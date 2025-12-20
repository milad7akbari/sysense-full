'use client'

import { useState, useEffect, useCallback, useRef } from "react";
import { MasonryGrid } from "@/components/feed/masonry-grid";
import { FeedItem } from "@/types/feed";
import { getProductsAction } from "@/server/actions/product-actions";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2 } from "lucide-react";

const PAGE_SIZE = 20;
const INFINITE_LIMIT = 10; // محدودیت ۱۰ بار اسکرول

export default function HomePage() {
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="min-h-screen bg-[#fafafa] pb-20">
            <main className="max-w-[1600px] mx-auto px-4 py-8">

                <MasonryGrid items={pins} />

                {isInfiniteMode && (
                    <div ref={observerTarget} className="h-20 flex items-center justify-center mt-10">
                        {loading && <Loader2 className="w-8 h-8 animate-spin text-violet-600" />}
                    </div>
                )}

                {!isInfiniteMode && !loading && (
                    <div className="mt-20 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="text-sm font-medium text-slate-500">
                            صفحه <span className="text-slate-900">{page}</span> از {totalPages}
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

                            <div className="flex items-center gap-1 mx-2">
                                {page > 1 && (
                                    <button onClick={() => handlePageChange(page - 1)} className="w-10 h-10 rounded-xl text-sm font-bold hover:bg-slate-100">
                                        {page - 1}
                                    </button>
                                )}
                                <button className="w-12 h-12 rounded-xl bg-violet-600 text-white text-sm font-bold shadow-lg shadow-violet-200">
                                    {page}
                                </button>
                                {page < totalPages && (
                                    <button onClick={() => handlePageChange(page + 1)} className="w-10 h-10 rounded-xl text-sm font-bold hover:bg-slate-100">
                                        {page + 1}
                                    </button>
                                )}
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
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
            {icon}
        </button>
    );
}