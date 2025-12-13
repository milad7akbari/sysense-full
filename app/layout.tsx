import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { cookies } from "next/headers";

const vazir = localFont({
    src: "./fonts/Vazirmatn[wght].woff2",
    display: "swap",
    variable: "--font-vazir",
});

export const metadata: Metadata = {
    title: "StyleSense | سای‌سنس",
    description: "هوشمندترین راه برای کشف استایل شخصی",
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    // بررسی وضعیت لاگین کاربر
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.has('session');

    return (
        <html lang="fa" dir="rtl">
        <body className={`${vazir.variable} font-sans antialiased bg-white text-zinc-900`}>
        {isLoggedIn ? (
            // ساختار داشبورد برای کاربران لاگین شده
            <div className="flex flex-col h-screen overflow-hidden">
                {/* هدر سراسری */}
                <Header />

                <div className="flex flex-1 overflow-hidden">
                    {/* سایدبار سراسری */}
                    <Sidebar />

                    {/* محتوای صفحات اینجا قرار می‌گیرد */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                        <div className="max-w-8xl mx-auto h-full">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        ) : (
            // ساختار ساده برای کاربران مهمان (لندینگ، لاگین و ...)
            children
        )}
        </body>
        </html>
    );
}