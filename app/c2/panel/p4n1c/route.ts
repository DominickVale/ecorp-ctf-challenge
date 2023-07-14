import {NextResponse} from 'next/server'
import {decode, JwtPayload, verify} from 'jsonwebtoken'
import {cookies} from "next/headers";

const ditch = () => new Response("", {status: 404})
export async function GET(request: Request) {
    // Check if the jwt contains the field "level" and it's 1
    const token = cookies().get("t")
    if (!token?.value) return ditch()
    try {
        const jwt = await verify(token.value, process.env.JWT_SECRET!) as JwtPayload
        if (jwt?.level !== 1) return ditch()
        return NextResponse.json(`Well done. You saved the world — for now. Here's your flag: ${process.env.P4N1CK_FLAG}`)
    } catch (e) {
        return ditch()
    }
}
