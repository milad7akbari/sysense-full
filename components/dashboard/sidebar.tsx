"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Compass,
    Layout,
    Bell,
    Settings,
    Sparkles,
    LogOut,
    PlusCircle
} from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { label: "خانه", icon: Home, href: "/home" },
        { label: "اکسپلور", icon: Compass, href: "/explore" },
        { label: "بوردها", icon: Layout, href: "/boards" },
        { label: "اعلانات", icon: Bell, href: "/notifications" },
    ];

    // تابع کمکی برای تشخیص فعال بودن لینک
    const isActive = (path: string) => pathname === path || pathname?.startsWith(path + "/");

    const iconButtonClass = "relative  font-sans flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 group";

    return (
            <aside className="hidden md:flex flex-col w-24 h-full border-l border-zinc-100 bg-white/50 backdrop-blur-sm z-40 py-6 items-center shrink-0">

            {/* --- منوی اصلی --- */}
            <nav className="flex-1 w-full flex flex-col items-center gap-4">

                {/* دکمه افزودن سریع (اختیاری ولی کاربردی) */}
                <button className="mb-2 w-10 h-10 rounded-full bg-zinc-50 text-zinc-400 border border-zinc-200 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center group" title="پست جدید">
                    <PlusCircle className="w-5 h-5" />
                </button>

                <div className="w-8 h-[1px] bg-zinc-100 mb-2"></div>

                {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link key={item.href} href={item.href} className="relative">
                            <div
                                className={`
                                    ${iconButtonClass}
                                    ${active
                                    ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                                    : 'text-zinc-400 hover:text-zinc-800 hover:bg-zinc-50'
                                }
                                `}
                            >
                                <item.icon className={`w-6 h-6 transition-transform duration-200 ${active ? 'fill-current' : 'group-hover:scale-120'}`} />

                                {/* نشانگر فعال بودن (نقطه کنار آیکون) */}
                                {active && (
                                    <div className="absolute -left-1 w-1 h-3 bg-indigo-500 rounded-full"></div>
                                )}

                                {/* تولتیپ هاور (نمایش نام منو) */}
                                <div className="absolute right-full mr-3 px-2 py-1 bg-zinc-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none translate-x-2 group-hover:translate-x-0">
                                    {item.label}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* --- منوی پایین (تنظیمات) --- */}
            <div className="mt-auto flex flex-col items-center gap-3">
                <Link href="/settings/general" className="relative group">
                    <div className={`${iconButtonClass} text-zinc-400 hover:text-zinc-800 hover:bg-zinc-50`}>
                        <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />

                        {/* تولتیپ تنظیمات */}
                        <div className="absolute right-full mr-3 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none translate-x-2 group-hover:translate-x-0">
                            تنظیمات
                        </div>
                    </div>
                </Link>
            </div>
        </aside>
    );
}