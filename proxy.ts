import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {

    const path = request.nextUrl.pathname;

    const isPublicPath = ['/login', '/signup'].includes(path);

    const token = request.cookies.get('token')?.value || '';

    if (
        path.startsWith('/_next') ||
        path.startsWith('/favicon.ico')
    ) {
        return NextResponse.next();
    }

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();

}
