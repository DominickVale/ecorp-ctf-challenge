import {NextResponse} from 'next/server'
import {JwtPayload, verify} from 'jsonwebtoken'
import {cookies} from "next/headers";

const ditch = (err?: string) => new Response(err ? `ERR: ${err}` : "", {status: 400})
export async function POST(request: Request) {
    const body: { testApiKey: string } = await request.json();
    const {testApiKey} = body;

    if (testApiKey !== process.env.NEXT_PUBLIC_TEST_API_KEY) {
        ditch("INVALID_API_KEY")
    }
    // Check if the jwt contains the field "level" and it's -1
    const token = cookies().get("t")
    if (!token?.value) return ditch()
    try {
        const jwt = await verify(token.value, process.env.JWT_SECRET!) as JwtPayload
        if (jwt?.level !== 2) return ditch()
        return NextResponse.json(`Well done. You saved the world — for now. Here's your flag: ${process.env.FLAG}`)
    } catch (e) {
        return ditch()
    }
}
