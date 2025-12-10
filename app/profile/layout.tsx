import {Sidebar} from "@/components/dashboard/sidebar";
import {Header} from "@/components/dashboard/header";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50/90 font-sans text-slate-900" dir="rtl">
            <Header />

            {/* Sidebar فیکس سمت راست از بالا تا پایین */}
            <Sidebar />

            {/* محتوا: IMPORTANT -> padding-top برابر با ارتفاع هدر، padding-right برابر با عرض سایدبار */}
            <div className="min-h-screen flex flex-col transition-all duration-300 ease-in-out lg:pr-72 pt-20">
                <main className="flex-1 p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-3 duration-700">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}