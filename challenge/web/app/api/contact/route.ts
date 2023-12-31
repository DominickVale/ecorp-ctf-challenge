import net from "net";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export type SupportType = "software" | "hardware" | "sales";

export async function POST(req: NextRequest) {
  const body: { message: string; author: string; supportType: SupportType } = await req.json();
  const { message, supportType } = body;
  const client = new net.Socket();
  let userAgent: string;
  console.log(supportType)
  if (supportType.toLowerCase() === "sales") {
    userAgent =
      process.env.ALLOWED_USER_AGENT_ID ||
      "NEUROTAP-v0.2-BEG!---32FM19630324809A5B1B4F1D49DAA507BBC86DC60F1C!---";
  } else {
    const staffUsers = await prisma.staffUser.findMany();
    // Select random staff id
    const randomStaffUser = staffUsers[Math.floor(Math.random() * staffUsers.length)];
    userAgent = `NEUROTAP-v0.2-BEG!---${randomStaffUser.id}!---`;
  }

  const job = {
    html: message,
    userAgent,
  };

  const data = JSON.stringify(job);
  client.connect(
    Number(process.env.XSSBOT_PORT) || 1337,
    process.env.XSSBOT_HOST || "bot",
    function () {
      client.write(data);
      client.destroy();
    }
  );
  return NextResponse.json("", { status: 200 });
}
