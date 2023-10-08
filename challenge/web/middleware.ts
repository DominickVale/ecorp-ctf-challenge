import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const userAgentReg = new RegExp(/^NEUROTAP-v0\.2-BEG!---(.*\d+.*)!---$/);

const redirToLogin = (req: NextRequest) =>
    NextResponse.rewrite(new URL("/c2/panel/login", req.url));

export async function middleware(req: NextRequest) {
    const userAgent = req.headers.get("user-agent");

    if (req.nextUrl.pathname.startsWith("/c2/panel")) {
        if (userAgent && !userAgentReg.test(userAgent)) {
            console.log("User agent not allowed: ", userAgent);
            return NextResponse.rewrite(new URL("/error?unknown-agent", req.url));
        }
        const token = req.cookies.get("t");
        if (!token?.value) {
            console.log("No token found");
            return redirToLogin(req);
        } else if (token) {
            try {
                await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET!));
            } catch (e: any) {
                console.log(e);

                return redirToLogin(req);
            }
        }
    }
}
