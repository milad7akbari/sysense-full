'use client'

import { useState } from "react";
import Link from "next/link"; // ایمپورت Link اضافه شد
import { Plus, X, Lock, Globe, Layout } from "lucide-react";
import Image from "next/image";

// تعریف نوع داده برای بورد
interface Board {
    id: number;
    title: string;
    pinsCount: number;
    coverImages: string[];
    isPrivate: boolean;
}

// داده‌های اولیه تستی
const INITIAL_BOARDS: Board[] = [
    {
        id: 1,
        title: "استایل تابستانه",
        pinsCount: 12,
        coverImages: ["/woman-3083453_1280.jpg", "/fashion-9464875_1920.jpg", "/1.jpeg"],
        isPrivate: false
    },
    {
        id: 2,
        title: "ایده‌های عکاسی",
        pinsCount: 8,
        coverImages: ["/portrait-young-happy-woman-studio.jpg", "/balancing-1868051_1920.jpg"],
        isPrivate: true
    },
    {
        id: 3,
        title: "اکسسوری‌ها",
        pinsCount: 24,
        coverImages: ["/woman-9554464_1920.jpg"],
        isPrivate: false
    }
];

export default function BoardsPage() {
    const [boards, setBoards] = useState<Board[]>(INITIAL_BOARDS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBoardTitle, setNewBoardTitle] = useState("");
    const [isNewBoardPrivate, setIsNewBoardPrivate] = useState(false);

    // تابع ساخت بورد جدید
    const handleCreateBoard = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBoardTitle.trim()) return;

        const newBoard: Board = {
            id: Date.now(),
            title: newBoardTitle,
            pinsCount: 0,
            coverImages: [],
            isPrivate: isNewBoardPrivate
        };

        setBoards([newBoard, ...boards]);
        setNewBoardTitle("");
        setIsNewBoardPrivate(false);
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">

            {/* --- هدر صفحه --- */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                        <Layout className="w-6 h-6 text-slate-400" />
                        بوردهای من
                    </h1>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">ساخت بورد جدید</span>
                </button>
            </div>

            {/* --- گرید بوردها --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* کارت ساخت سریع (بدون تغییر) */}
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="group aspect-[4/3] rounded-3xl border-2 border-dashed border-slate-200 hover:border-purple-400 bg-slate-50 hover:bg-purple-50/30 flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
                >
                    <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-400 group-hover:bg-purple-100 group-hover:text-purple-600 flex items-center justify-center mb-3 transition-colors">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-500 group-hover:text-purple-700">ایجاد بورد جدید</span>
                </div>

                {/* نمایش لیست بوردها با لینک */}
                {boards.map((board) => (
                    // تغییر مهم: اضافه کردن Link برای هدایت به صفحه جزئیات
                    <Link key={board.id} href={`/boards/${board.id}`}>
                        <BoardCard board={board} />
                    </Link>
                ))}
            </div>

            {/* --- مودال ساخت بورد (بدون تغییر) --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="bg-white rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-800">ساخت بورد</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateBoard} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 block">نام بورد</label>
                                <input
                                    type="text"
                                    placeholder="مثلاً: ایده‌های تولد، لباس زمستانی..."
                                    value={newBoardTitle}
                                    onChange={(e) => setNewBoardTitle(e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none font-medium"
                                    autoFocus
                                />
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setIsNewBoardPrivate(!isNewBoardPrivate)}>
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isNewBoardPrivate ? 'bg-purple-600 border-purple-600' : 'border-slate-300 bg-white'}`}>
                                    {isNewBoardPrivate && <X className="w-3.5 h-3.5 text-white rotate-45" style={{ transform: 'rotate(0deg)' }} />}
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-sm text-slate-800">مخفی نگه داشتن بورد</div>
                                    <div className="text-xs text-slate-400">فقط شما و همکارانتان می‌توانید این بورد را ببینید.</div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!newBoardTitle.trim()}
                                className="w-full h-12 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-200 active:scale-[0.98]"
                            >
                                ایجاد بورد
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// کامپوننت کارت تکی بورد
function BoardCard({ board }: { board: Board }) {
    return (
        <div className="group cursor-pointer h-full">
            {/* بخش تصاویر کاور */}
            <div className="aspect-[4/3] rounded-3xl bg-slate-100 overflow-hidden relative border border-slate-100 mb-3 group-hover:shadow-md transition-all duration-300">
                {board.coverImages.length > 0 ? (
                    <div className="w-full h-full flex gap-0.5">
                        <div className="w-2/3 h-full relative">
                            <Image
                                src={board.coverImages[0]}
                                alt={board.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="w-1/3 h-full flex flex-col gap-0.5">
                            <div className="h-1/2 w-full relative bg-slate-200">
                                {board.coverImages[1] && (
                                    <Image src={board.coverImages[1]} alt="" fill className="object-cover" />
                                )}
                            </div>
                            <div className="h-1/2 w-full relative bg-slate-200">
                                {board.coverImages[2] && (
                                    <Image src={board.coverImages[2]} alt="" fill className="object-cover" />
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
                        <Layout className="w-12 h-12 mb-2 opacity-50" />
                        <span className="text-xs font-bold">بدون پین</span>
                    </div>
                )}

                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>

            {/* اطلاعات بورد */}
            <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight truncate pl-2 group-hover:text-purple-700 transition-colors">{board.title}</h3>
                <div className="flex items-center gap-2 mt-1 pl-2">
                    <span className="text-xs text-slate-500 font-medium">{board.pinsCount} پین</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        {board.isPrivate ? (
                            <><Lock className="w-3 h-3" /> خصوصی</>
                        ) : (
                            <><Globe className="w-3 h-3" /> عمومی</>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}