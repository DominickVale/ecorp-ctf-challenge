import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const userAgentReg = new RegExp(/^NEUROTAP-v0\.2-BEG!---(.*\d+.*)!---$/);

export async function middleware(req: NextRequest) {
  const userAgent = req.headers.get("user-agent");
  
  if (req.nextUrl.pathname.startsWith("/c2/panel")) {
    if (typeof userAgent === "string" && !userAgentReg.test(userAgent)) {
      console.log("User agent not allowed: ", userAgent)
      return NextResponse.rewrite(new URL("/error?unknown-agent", req.url));
    }
    if (!req.cookies.get("t")) return NextResponse.rewrite(new URL("/c2/panel/login", req.url));
  }
}
