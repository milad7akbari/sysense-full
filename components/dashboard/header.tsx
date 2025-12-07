'use client'

import {
    Bell,
    MessageCircle,
    Home,
    Compass
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation"; 

export function DashboardHeader() {
    const pathname = usePathname(); 

    
    const getButtonStyles = (path: string) => {
        const isActive = pathname === path;
        return `gap-2 transition-colors ${
            isActive
                ? "bg-slate-100 text-primary font-bold shadow-sm" 
                : "text-slate-500 font-medium hover:bg-slate-100 hover:text-slate-900" 
        }`;
    };

    return (
        <header className="h-20 px-6 lg:px-8 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-30 transition-all gap-4">

            
            <div className="hidden md:flex items-center gap-2">

                
                <Link href="/profile/home">
                    <Button variant="ghost" className={getButtonStyles('/profile/home')}>
                        <Home className="w-5 h-5" />
                        <span>خانه</span>
                    </Button>
                </Link>

                
                <Link href="/explore">
                    <Button variant="ghost" className={getButtonStyles('/explore')}>
                        <Compass className="w-5 h-5" />
                        <span>اکسپلور</span>
                    </Button>
                </Link>
            </div>


            
            <div className="flex items-center gap-2 sm:gap-4 mr-auto">

                <Link href="/notifications">
                    <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-slate-100 text-slate-500 hover:text-slate-700">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm animate-pulse"></span>
                    </Button>
                </Link>

                <Link href="/messages">
                    <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                        <MessageCircle className="w-6 h-6" />
                    </Button>
                </Link>

                
                <div className="flex items-center gap-3 pr-2 border-r border-slate-200/60 pl-2">
                    <div className="text-left hidden lg:block leading-tight">
                        <p className="text-sm font-bold text-slate-800">کاربر سای‌سنس</p>
                        <p className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full mt-0.5 inline-block">
                            عضو طلایی
                        </p>
                    </div>

                    
                    <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-primary via-purple-400 to-pink-400 shadow-md cursor-pointer hover:scale-105 transition-transform">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            <span className="font-black text-sm text-transparent bg-clip-text bg-gradient-to-br from-primary to-purple-600">
                                US
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}