import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const vazirmatn = Vazirmatn({
    subsets: ["arabic"],
    variable: "--font-vazir",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Sysense | ورود",
    description: "پلتفرم هوشمند Sysense",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" dir="rtl" suppressHydrationWarning>
        <body className={`${vazirmatn.variable} font-sans antialiased bg-background text-foreground h-full`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}