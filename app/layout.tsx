// app/layout.tsx
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google"; // ایمپورت فونت وزیر
import "./globals.css";

// تنظیم فونت وزیر
const vazir = Vazirmatn({
    subsets: ["arabic", "latin"],
    variable: "--font-vazir",
    display: "swap",
});

export const metadata: Metadata = {
    title: "StyleSense | سای‌سنس",
    description: "هوشمندترین راه برای کشف استایل شخصی",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // اضافه کردن متغیر فونت و تنظیم جهت راست‌چین (rtl)
        <html lang="fa" dir="rtl">
        <body className={`${vazir.variable} antialiased font-sans`}>
        {children}
        </body>
        </html>
    );
}