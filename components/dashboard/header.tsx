import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
    return (
        // تغییر: z-30 برای اینکه زیر سایدبار (z-40) بماند اما روی محتوا باشد
        <header className="h-20 px-6 lg:px-8 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-30 transition-all">

            {/* Right Actions (Profile & Notif) - Aligned to Left in RTL */}
            <div className="flex items-center gap-4 mr-auto">

                {/* Notification Button */}
                <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-transform hover:scale-105">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm animate-pulse"></span>
                </Button>

                {/* User Profile */}
                <div className="flex items-center gap-3 pr-4 border-r border-slate-200/60 pl-2">
                    <div className="text-left hidden md:block leading-tight">
                        <p className="text-sm font-bold text-slate-800">کاربر سای‌سنس</p>
                        <p className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full mt-0.5 inline-block">
                            عضو طلایی
                        </p>
                    </div>

                    {/* Avatar Ring */}
                    <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-primary via-purple-400 to-pink-400 shadow-md">
                        {/* Fallback Image / Avatar */}
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            {/* اگر عکس واقعی دارید اینجا قرار دهید، فعلا این placeholder عالی است */}
                            <span className="font-black text-lg text-transparent bg-clip-text bg-gradient-to-br from-primary to-purple-600">
                 U
               </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}