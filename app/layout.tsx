import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const vazir = localFont({
    src: "./fonts/Vazirmatn[wght].woff2",
    display: "swap",
    variable: "--font-vazir",
});

export const metadata: Metadata = {
    title: "StyleSense | سای‌سنس",
    description: "هوشمندترین راه برای کشف استایل شخصی",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fa" dir="rtl">
        <body className={`${vazir.variable} antialiased font-sans`}>
        {children}
        </body>
        </html>
    );
}
