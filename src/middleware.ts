import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // Get user from cookies (for server-side check)
    const userCookie = request.cookies.get('user')?.value;
    const user = userCookie ? JSON.parse(userCookie) : null;
    const token = user?.token;
    
    // Handle /user route
    if (pathname.startsWith('/user')) {
        // If no token, allow access to /user (login/signup)
        if (!token) {
            return NextResponse.next();
        }
        // If token exists and user is trying to access /user, redirect to /rank
        return NextResponse.redirect(new URL('/rank', request.url));
    }
    
    // Handle /rank route - require authentication
    if (pathname === '/rank') {
        // If no token, redirect to /user (login)
        if (!token) {
            return NextResponse.redirect(new URL('/user', request.url));
        }
        // If token exists, allow access to /rank
        return NextResponse.next();
    }
    
    // Allow all other routes
    return NextResponse.next();
}