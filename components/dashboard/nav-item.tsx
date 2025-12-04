'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

export function NavItem({ href, icon: Icon, label }: NavItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium text-sm",
                isActive
                    ? "bg-primary/10 text-primary shadow-sm shadow-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-white hover:shadow-sm"
            )}
        >
            <Icon
                className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
            />
            <span>{label}</span>

            {/* نشانگر فعال بودن (اختیاری برای زیبایی) */}
            {isActive && (
                <div className="mr-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            )}
        </Link>
    );
}