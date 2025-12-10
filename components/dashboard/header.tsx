import { Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 md:right-16 h-16 bg-white/90 backdrop-blur-md z-40 flex items-center justify-between px-6 transition-all duration-300">

            <div className="flex items-center gap-4">
                <div className="md:hidden">
                    <Button variant="ghost" size="icon">
                        <Menu className="w-6 h-6" />
                    </Button>
                </div>
                <h1 className="font-bold text-lg text-slate-800">داشبورد</h1>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-gray-500">
                    <Search className="w-5 h-5" />
                </Button>

                <Link href="/profile/home">
                    <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 hover:bg-gray-100 overflow-hidden border border-gray-200">
                        <User className="w-5 h-5 text-gray-600" />
                    </Button>
                </Link>
            </div>
        </header>
    );
}