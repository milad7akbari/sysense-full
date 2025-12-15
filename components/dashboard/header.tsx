"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
    Search,
    User,
    Menu,
    Bell,
    SlidersHorizontal,
    Sparkles,
    Settings,
    LogOut,
    Heart,
    X,
} from "lucide-react";

export function Header() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);
    const notifRef = useRef<HTMLDivElement>(null);
    const mobileInputRef = useRef<HTMLInputElement>(null);

    // مدیریت کلیک خارج از منو برای بستن آن
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // اگر منوی پروفایل باز بود و کلیک خارج از آن انجام شد -> ببند
            if (isProfileOpen && profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            // اگر منوی اعلان باز بود و کلیک خارج از آن انجام شد -> ببند
            if (isNotifOpen && notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isProfileOpen, isNotifOpen]); // وابستگی‌ها اضافه شدند تا استیت‌های جدید را بشناسد

    useEffect(() => {
        if (isMobileSearchOpen && mobileInputRef.current) {
            mobileInputRef.current.focus();
        }
    }, [isMobileSearchOpen]);

    const notifications = [
        { id: 1, text: "تکمیل پروفایل شما با موفقیت انجام شد.", time: "2 دقیقه پیش", read: false },
        { id: 2, text: "علی پست شما را پسندید.", time: "1 ساعت پیش", read: true },
        { id: 3, text: "نسخه جدید داشبورد در دسترس است.", time: "دیروز", read: true },
    ];

    const iconButtonClass = "relative flex items-center justify-center rounded-full transition-all duration-200 ease-out hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 active:scale-95 focus:outline-none";

    return (
        // تغییر مهم: حذف 'overflow-hidden' از اینجا تا منوها نمایش داده شوند
        <header className="z-50 w-full bg-white/95 backdrop-blur-md border-b border-zinc-100 font-sans transition-all duration-300 relative">
            <div className="flex h-20 items-center justify-between px-4 md:px-8 gap-4 max-w-[1920px] mx-auto relative">

                <div
                    className={`absolute inset-0 z-[60] bg-white flex items-center px-4 gap-3 transition-all duration-300 ease-in-out md:hidden ${
                        isMobileSearchOpen
                            ? 'opacity-100 visible translate-y-0'
                            : 'opacity-0 invisible -translate-y-4 pointer-events-none'
                    }`}
                >
                    <div className="relative flex-1">
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            ref={mobileInputRef}
                            type="text"
                            placeholder="جستجو کنید..."
                            className="w-full h-12 pr-10 pl-4 rounded-full bg-zinc-100/80 border-transparent text-zinc-800 placeholder:text-zinc-500 focus:bg-white focus:border-zinc-300 focus:ring-0 transition-all text-base font-medium"
                        />
                    </div>
                    {/* دکمه بستن جستجو */}
                    <button
                        onClick={() => setIsMobileSearchOpen(false)}
                        className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 text-zinc-600 hover:bg-zinc-100 active:scale-95 transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>


                <div className={`flex items-center gap-2 sm:gap-3 shrink-0 transition-opacity duration-200 ${isMobileSearchOpen ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}>
                    <div className="lg:hidden">
                        <button className={`${iconButtonClass} w-10 h-10`}>
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>

                    {/* دکمه تریگر جستجو در موبایل */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMobileSearchOpen(true)} className={`${iconButtonClass} w-10 h-10`}>
                            <Search className="w-6 h-6" />
                        </button>
                    </div>

                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform duration-300">
                            <Sparkles className="w-5 h-5 md:w-5 md:h-5 text-white/90 fill-white/10" />
                        </div>
                        <span className="font-bold text-xl text-zinc-900 hidden lg:block tracking-tight group-hover:text-indigo-600 transition-colors">
                            سای‌سنس
                        </span>
                    </Link>
                </div>

                {/* --- بخش وسط: جستجو (فقط دسکتاپ) --- */}
                <div className={`flex-1 max-w-2xl px-4 lg:px-8 hidden md:flex transition-opacity duration-200 ${isMobileSearchOpen ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}>
                    <div className="relative group w-full">
                        <div className="relative flex items-center">
                            <div className="absolute right-4 text-zinc-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none">
                                <Search className="w-5 h-5" />
                            </div>

                            <input
                                type="text"
                                placeholder="جستجو در بین هزاران ایده..."
                                className="w-full h-12 pr-12 pl-24 rounded-full bg-zinc-50/50 border border-transparent text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:border-zinc-200 focus:shadow-sm focus:outline-none transition-all duration-300 text-base hover:bg-zinc-100"
                            />

                            <div className="absolute left-1.5 top-1/2 -translate-y-1/2">
                                <button className="flex items-center gap-2 h-9 px-4 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-white/80 transition-all text-xs font-medium focus:outline-none">
                                    <SlidersHorizontal className="w-4 h-4" />
                                    <span className="inline-block">فیلترها</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- بخش چپ: پروفایل و اعلانات --- */}
                <div className={`flex items-center gap-2 sm:gap-3 shrink-0 transition-opacity duration-200 ${isMobileSearchOpen ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}>

                    {/* دکمه اعلانات */}
                    <div className="relative" ref={notifRef}>
                        <button
                            onClick={() => setIsNotifOpen((prev) => !prev)}
                            className={`${iconButtonClass} w-11 h-11 ${isNotifOpen ? 'bg-zinc-100 text-zinc-900' : ''}`}
                        >
                            <Bell className={`w-6 h-6 transition-transform duration-300 ${isNotifOpen ? 'fill-current' : ''}`} />
                            <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        {isNotifOpen && (
                            <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
                                <div className="p-4 border-b border-zinc-50 flex justify-between items-center bg-white">
                                    <span className="font-bold text-sm text-zinc-800">اعلانات</span>
                                    <button className="text-xs text-indigo-600 hover:underline font-medium">خواندن همه</button>
                                </div>
                                <div className="max-h-64 overflow-y-auto p-2 space-y-1 scrollbar-hide">
                                    {notifications.map((notif) => (
                                        <div key={notif.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer group">
                                            <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${notif.read ? 'bg-zinc-300' : 'bg-indigo-500'}`} />
                                            <div>
                                                <p className="text-sm text-zinc-700 group-hover:text-zinc-900 font-medium leading-snug">{notif.text}</p>
                                                <span className="text-[11px] text-zinc-400 mt-1 block">{notif.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* دکمه پروفایل */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setIsProfileOpen((prev) => !prev)}
                            className={`flex items-center gap-2 pl-1 pr-1 sm:pr-3 py-1 rounded-full transition-all duration-200 hover:bg-zinc-100 focus:outline-none ${isProfileOpen ? 'bg-zinc-100' : ''}`}
                        >
                            <div className="w-10 h-10 rounded-full bg-zinc-100 p-0.5 shadow-sm ring-1 ring-zinc-100">
                                <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                    A
                                </div>
                            </div>
                            <div className="hidden sm:flex flex-col items-start gap-0.5 text-right mr-1">
                                <span className="text-sm font-bold text-zinc-700 leading-none">امیرحسین</span>
                                <span className="text-[10px] text-zinc-400 font-medium">کاربر طلایی</span>
                            </div>
                        </button>

                        {isProfileOpen && (
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 p-2 z-[100]">
                                <div className="p-3 mb-2 bg-zinc-50/50 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-sm text-zinc-800 truncate">امیرحسین</p>
                                        <p className="text-xs text-zinc-500 truncate">amir@example.com</p>
                                    </div>
                                </div>

                                <div className="space-y-0.5">
                                    <Link href="/profile/home" className="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                                        <User className="w-4 h-4" />
                                        <span>پروفایل من</span>
                                    </Link>
                                    <Link href="/profile/likes" className="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-pink-600 transition-colors">
                                        <Heart className="w-4 h-4" />
                                        <span>علاقه‌مندی‌ها</span>
                                    </Link>
                                    <Link href="/settings/general" className="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                                        <Settings className="w-4 h-4" />
                                        <span>تنظیمات</span>
                                    </Link>
                                </div>

                                <div className="mt-2 pt-2 border-t border-zinc-100">
                                    <button className="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                                        <LogOut className="w-4 h-4" />
                                        <span>خروج از حساب</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
}