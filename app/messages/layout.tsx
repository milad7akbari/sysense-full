import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function MessagesLayout({
                                           children,
                                       }: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen bg-slate-50/90 font-sans text-slate-900 overflow-hidden flex flex-col" dir="rtl">
            {/* در صفحه پیام‌ها، اسکرول اصلی صفحه را حذف می‌کنیم تا پنل چت اسکرول شود */}
            <Sidebar />
            <div className="lg:pr-72 flex-1 flex flex-col h-full transition-all duration-300 ease-in-out">
                <DashboardHeader />
                <main className="flex-1 h-[calc(100vh-80px)] p-4 lg:p-6 animate-in fade-in zoom-in-95 duration-500">
                    {children}
                </main>
            </div>
        </div>
    );
}