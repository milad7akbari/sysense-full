'use client'

import {
    Bell,
    MessageCircle,
    Home,
    Compass
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DashboardHeader() {
    return (
        // z-30 ensures it stays below the Sidebar (z-40) but above page content
        <header className="h-20 px-6 lg:px-8 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-30 transition-all gap-4">

            {/* --- LEFT SECTION: Navigation Links --- */}
            {/* On Desktop, these serve as quick access to main feeds */}
            <div className="hidden md:flex items-center gap-1">
                <Button
                    variant="ghost"
                    className="font-bold text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors gap-2"
                >
                    <Home className="w-5 h-5" />
                    <span>خانه</span>
                </Button>

                <Button
                    variant="ghost"
                    className="font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors gap-2"
                >
                    <Compass className="w-5 h-5" />
                    <span>اکسپلور</span>
                </Button>
            </div>


            {/* --- RIGHT SECTION: Actions & Profile --- */}
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
                {/* User Profile Summary */}
                <div className="flex items-center gap-3 pr-2 border-r border-slate-200/60 pl-2">
                    <div className="text-left hidden lg:block leading-tight">
                        <p className="text-sm font-bold text-slate-800">کاربر سای‌سنس</p>
                        <p className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full mt-0.5 inline-block">
                            عضو طلایی
                        </p>
                    </div>

                    {/* Avatar Ring */}
                    <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-primary via-purple-400 to-pink-400 shadow-md cursor-pointer hover:scale-105 transition-transform">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            {/* Placeholder for User Avatar */}
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