import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(req: NextRequest) {
    const protectedRoutes = ["/feed", "/profile", "/me"];
    const isProtected = protectedRoutes.some(path => req.nextUrl.pathname.startsWith(path));

    if (isProtected) {
        const cookie = req.cookies.get("session")?.value;
        const session = cookie ? await decrypt(cookie) : null;

        if (!session) {
            return NextResponse.redirect(new URL("/login", req.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};