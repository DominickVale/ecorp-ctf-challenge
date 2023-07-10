import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

const userAgentReg = new RegExp(
    process.env.ALLOWED_USER_AGENT_REGEX || /^NEUROTAP-v0\.2-BEG!---.*\d+!---$/
)

export async function middleware(req: NextRequest) {
    const userAgent = req.headers.get("user-agent")
    if (!req.cookies.get("t")) return NextResponse.rewrite(new URL('/login', req.url))
    if (req.nextUrl.pathname.startsWith('/c2/panel') && typeof userAgent === 'string' && userAgentReg.test(userAgent)) {
        return NextResponse.rewrite(new URL('/error', req.url));
    }
}
