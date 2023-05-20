import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const userAgent = req.headers.get("user-agent")
    //                                                   don't forget this lol
    if (req.nextUrl.pathname.startsWith('/c2/panel')/* && userAgent != "test"*/) {
        return NextResponse.rewrite(new URL('/error', req.url));
    }
}
