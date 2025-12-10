import Link from "next/link";
import { Home, Compass, Bell, Layout, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
    const navItems = [
        { label: "خانه", icon: Home, href: "/home" },
        { label: "اکسپلور", icon: Compass, href: "/explore" },
        { label: "بوردها", icon: Layout, href: "/boards" },
        { label: "اعلانات", icon: Bell, href: "/notifications" },
    ];

    return (
        <aside className="hidden md:flex flex-col w-16 h-screen fixed top-0 right-0 border-l bg-white z-50 p-2 items-center shadow-sm">
            {/* لوگو یا آیکون بالای سایدبار */}
            <div className="mb-6 mt-2">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold">
                    L
                </div>
            </div>

            <nav className="space-y-4 w-full flex flex-col items-center">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-10 h-10 rounded-xl hover:bg-gray-100 hover:text-red-600 transition-colors"
                            title={item.label}
                        >
                            <item.icon className="w-5 h-5" />
                        </Button>
                    </Link>
                ))}
            </nav>

            <div className="mt-auto mb-4">
                <Link href="/settings/general">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-10 h-10 rounded-xl hover:bg-gray-100"
                    >
                        <Settings className="w-5 h-5" />
                    </Button>
                </Link>
            </div>
        </aside>
    );
}