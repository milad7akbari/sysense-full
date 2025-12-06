import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function NotificationsLayout({
                                                children,
                                            }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50/90 font-sans text-slate-900" dir="rtl">
            <Sidebar />
            <div className="lg:pr-72 min-h-screen flex flex-col transition-all duration-300 ease-in-out">
                <DashboardHeader />
                <main className="flex-1 p-4 lg:p-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}