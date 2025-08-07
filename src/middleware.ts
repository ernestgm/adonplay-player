import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";

export function middleware(request: NextRequest) {
    const isValidDeviceId: RequestCookie | undefined = request.cookies.get('device_id');
    const isValidCode: RequestCookie | undefined = request.cookies.get('device_code');
    const isValidDeviceToken: RequestCookie | undefined = request.cookies.get('device_token');

    const isAuthenticated:RequestCookie | undefined = request.cookies.get('user');
    const isOnSignin = request.nextUrl.pathname === '/signin';

    if (!isValidDeviceId && !isValidCode && !isValidDeviceToken) {
        const notFoundUrl = request.nextUrl.clone();
        notFoundUrl.pathname = '/not-found';
        return NextResponse.redirect(notFoundUrl);
    }

    if (!isAuthenticated && !isOnSignin) {
        const signinUrl = request.nextUrl.clone();
        signinUrl.pathname = '/signin';
        signinUrl.searchParams.set('redirect', request.nextUrl.pathname + request.nextUrl.search);
        return NextResponse.redirect(signinUrl);
    } else if (isAuthenticated && isOnSignin) {
        const homeUrl = request.nextUrl.clone();
        homeUrl.pathname = '/';
        return NextResponse.redirect(homeUrl);
    } else {
        const userObj = JSON.parse(isAuthenticated?.value || '{}');
        const userRole = userObj.roles?.[0]?.code;

        if (
            userRole === 'owner' && request.nextUrl.pathname === '/users/create' ||
            userRole === 'owner' && request.nextUrl.pathname === '/business/create'
        ) {
            const notFoundUrl = request.nextUrl.clone();
            notFoundUrl.pathname = '/not-found';
            return NextResponse.redirect(notFoundUrl);
        }

        if ( userRole === 'owner' && request.nextUrl.pathname === '/users'
        ) {
            const home = request.nextUrl.clone();
            home.pathname = '/';
            return NextResponse.redirect(home);
        }
    }

    return NextResponse.next();
}

// Configura las rutas protegidas (puedes ajustar el matcher según tus necesidades)
export const config = {
    matcher: [
        '/',
        '/home',
        '/player',
        '/signin',
    ],
};