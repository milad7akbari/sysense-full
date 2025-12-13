import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that do NOT require authentication
const PUBLIC_PATHS = [
    '/',          // Landing page
    '/login',     // Login page
    '/api/auth',  // Authentication API routes
]

export function proxy(request: NextRequest) {
    const session = request.cookies.get('session')
    const { pathname } = request.nextUrl

    // Check if the current path is public
    const isPublicPath = PUBLIC_PATHS.some(path => {
        if (path === pathname) return true
        if (pathname.startsWith(path + '/')) return true
        return false
    })

    // Not authenticated → trying to access a protected route
    if (!session && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Authenticated → trying to access landing or login
    if (session && (pathname === '/' || pathname === '/login')) {
        return NextResponse.redirect(new URL('/home', request.url))
    }

    // Allow request to continue
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
