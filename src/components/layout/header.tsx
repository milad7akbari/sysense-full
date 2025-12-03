'use client'

import { Bell, LogOut, Plus, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">

                {/* لوگو (موبایل و دسکتاپ) */}
                <Link href="/feed" className="flex items-center gap-2 shrink-0">
                    <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl shadow-md">
                        S
                    </div>
                    <span className="hidden md:block text-xl font-bold tracking-tight">سای‌سنس</span>
                </Link>

                {/* نوار جستجو (فقط دسکتاپ و تبلت - در موبایل می‌توان دکمه گذاشت) */}
                <div className="flex-1 max-w-2xl hidden sm:block">
                    <div className="relative group">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                            <Search className="h-5 w-5" />
                        </div>
                        <Input
                            placeholder="جستجو در میان هزاران ایده..."
                            className="w-full h-12 pr-12 rounded-full bg-secondary/50 border-transparent focus:bg-background focus:border-primary transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* دکمه‌های سمت چپ */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {/* دکمه جستجو برای موبایل */}
                    <Button variant="ghost" size="icon" className="sm:hidden rounded-full">
                        <Search className="h-6 w-6" />
                    </Button>

                    <Button variant="ghost" size="icon" className="rounded-full relative">
                        <Bell className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
                        <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-background" />
                    </Button>

                    <Link href="/create">
                        <Button className="hidden sm:flex rounded-full px-6 font-bold shadow-lg shadow-primary/20">
                            <Plus className="ml-2 h-5 w-5" />
                            ایجاد پست
                        </Button>
                    </Link>

                    <div className="h-10 w-10 rounded-full bg-secondary overflow-hidden border border-border cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all">
                        {/* آواتار کاربر - فعلا استاتیک */}
                        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                            M
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}