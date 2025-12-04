'use client'
import {
    LayoutDashboard,
    Shirt,
    Heart,
    Settings,
    LogOut,
    ShoppingBag,
    UserCheck
} from "lucide-react";
import { NavItem } from "./nav-item";
import Link from "next/link";

const navItems = [
    { label: "داشبورد", href: "/profile", icon: LayoutDashboard },
    { label: "کمد لباس من", href: "/profile/wardrobe", icon: Shirt },
    { label: "لیست علاقه‌مندی‌ها", href: "/profile/favorites", icon: Heart },
    { label: "سفارش‌های من", href: "/profile/orders", icon: ShoppingBag },
    { label: "تنظیمات حساب", href: "/profile/settings", icon: Settings },
];

export function Sidebar() {
    return (
        // تغییر: z-40 برای اینکه همیشه روی هدر باشد. استفاده از bg-white خالص برای تمیزی
        <aside className="hidden lg:flex flex-col w-72 h-full bg-white border-l border-slate-200/70 fixed right-0 top-0 z-40 shadow-[0_0_15px_rgba(0,0,0,0.03)]">

            {/* Logo Header */}
            <div className="h-24 flex items-center px-8">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 transition-transform group-hover:scale-110 duration-300">
                        {/* آیکون ساده به جای متن S */}
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

            {/* Navigation Items */}
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-4 mt-2">
                    منوی دسترسی
                </div>

                {/* نکته: اطمینان حاصل کنید که در کامپوننت NavItem از کلاس‌های
                   hover:bg-primary/5 و text-primary برای حالت اکتیو استفاده می‌کنید
                */}
                {navItems.map((item) => (
                    <NavItem key={item.href} {...item} />
                ))}
            </nav>

            {/* Footer / User Badge & Logout */}
            <div className="p-5 mt-auto">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                            <UserCheck size={18} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-700">وضعیت اشتراک</p>
                            <p className="text-[10px] text-slate-500">۲۵ روز باقی‌مانده</p>
                        </div>
                    </div>

                    <button className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600 transition-all duration-200 text-sm font-bold shadow-sm">
                        <LogOut className="w-4 h-4" />
                        <span>خروج از حساب</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}