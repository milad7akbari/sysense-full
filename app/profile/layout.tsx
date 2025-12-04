import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function ProfileLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        // تغییر: استفاده از bg-slate-50 برای رنگی گرم‌تر و استانداردتر نسبت به سفید مطلق
        <div className="min-h-screen bg-slate-50/90 font-sans text-slate-900" dir="rtl">

            {/* Sidebar - Fixed Right Position */}
            <Sidebar />

            {/* Main Content Area */}
            {/* تغییر: lg:pr-72 با عرض سایدبار هماهنگ است. transition برای نرمی تغییر سایز */}
            <div className="lg:pr-72 min-h-screen flex flex-col transition-all duration-300 ease-in-out">

                <DashboardHeader />

                <main className="flex-1 p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-3 duration-700">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}