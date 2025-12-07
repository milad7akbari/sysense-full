'use client'

import {
    LayoutDashboard,
    Shirt,
    Heart,
    Settings,
    LogOut,
    UserCheck,
    User,
    Bookmark,
    History,
    ShieldCheck,
    Bell,
    Grid,
    Lock
} from "lucide-react";
import { NavItem } from "./nav-item";
import Link from "next/link";


const navItems = [
    
    {
        label: "پروفایل من",
        href: "/profile",
        icon: User,
        description: "مشاهده و ویرایش نمایه"
    },
    {
        label: "مورد علاقه‌ها",
        href: "/profile/likes",
        icon: Heart,
    },
    {
        label: "اعلان‌ها",
        href: "/settings/notifications",
        icon: Bell,
    },
    {
        label: "حریم خصوصی",
        href: "/settings/privacy",
        icon: ShieldCheck,
    },
    {
        label: "تنظیمات عمومی",
        href: "/settings/general",
        icon: Settings,
    },
];

export function Sidebar() {
    return (
        
        <aside className="hidden lg:flex flex-col w-72 h-full bg-white border-l border-slate-200 fixed right-0 top-0 z-40 shadow-[0_0_15px_rgba(0,0,0,0.03)] transition-all duration-300">

            
            <div className="h-24 flex items-center px-8">
                <Link href="/" className="flex items-center gap-3 group select-none">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 transition-transform group-hover:scale-110 duration-300">
                        <Shirt className="w-6 h-6 fill-current" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                            سای‌سنس
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">استایل هوشمند شما</span>
                    </div>
                </Link>
            </div>

            
            <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">

                
                <div className="text-[11px] font-bold text-slate-400/80 uppercase tracking-wider mb-2 px-4 mt-4">
                    کتابخانه من
                </div>
                {navItems.slice(0, 5).map((item) => (
                    <NavItem key={item.href} {...item} />
                ))}

                <div className="my-4 border-t border-slate-100 mx-4" />

                
                <div className="text-[11px] font-bold text-slate-400/80 uppercase tracking-wider mb-2 px-4">
                    مدیریت حساب
                </div>
                {navItems.slice(5).map((item) => (
                    <NavItem key={item.href} {...item} />
                ))}
            </nav>

            
            <div className="p-5 mt-auto">
                <div className="bg-slate-50/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-100/80 hover:border-slate-200 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-100/50 text-emerald-600 rounded-xl flex items-center justify-center">
                            <UserCheck size={18} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-xs font-extrabold text-slate-700">اشتراک ویژه</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">۲۵ روز باقی‌مانده</p>
                        </div>
                    </div>

                    <button className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-rose-500 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all duration-200 text-xs font-bold shadow-sm hover:shadow active:scale-95">
                        <LogOut className="w-4 h-4" />
                        <span>خروج از حساب</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}