import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Only protect the /user route
    if (pathname.startsWith('/user')) {
        // Get user from cookies (for server-side check)
        const userCookie = request.cookies.get('user')?.value;
        const user = userCookie ? JSON.parse(userCookie) : null;
        const token = user?.token;
        
        // If no token, redirect to /user (login)
        if (!token) {
            return NextResponse.redirect(new URL('/user', request.url));
        }
        
        // If token exists and user is trying to access /user, redirect to /rank
        if (token) {
            return NextResponse.redirect(new URL('/rank', request.url));
        }
    }
    
    // Allow all other routes
    return NextResponse.next();
}