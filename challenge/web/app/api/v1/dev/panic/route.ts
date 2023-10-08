import {NextResponse} from 'next/server'
import {JwtPayload, verify} from 'jsonwebtoken'
import {cookies} from "next/headers";

const ditch = (err?: string) => new Response(err ? `ERR: ${err}` : "", {status: 403})
export async function POST(request: Request) {
    // Check if the jwt contains the field "level" and it's -1
    const token = cookies().get("t")
    if (!token?.value) return ditch()
    try {
        const jwt = verify(token.value, process.env.JWT_SECRET!) as JwtPayload
        // jwt level 0 = admin, 1 = staff user
        if (jwt?.level !== 0) return ditch()
        return NextResponse.json(`Well done. You saved the world — for now. Here's your flag: ${process.env.FLAG}`)
    } catch (e: any) {
        return ditch()
    }
}
