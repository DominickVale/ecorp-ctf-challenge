import {NextRequest, NextResponse} from "next/server";
import net from "net";

export async function POST(req: NextRequest) {
    const body: { message: string } = await req.json();
    const message = body.message;
    const client = new net.Socket();
    client.connect(Number(process.env.XSSBOT_PORT) || 1337, process.env.XSSBOT_HOST || 'bot', function () {
        client.write(message);
        client.destroy()
    });
    return NextResponse.json('', {status: 200});
}
