import net from "net";
import { NextRequest, NextResponse } from "next/server";
import { JobType } from "@/bot";

import prisma from "@/lib/prisma";

export type SupportType = "software" | "hardware" | "sales";

export async function POST(req: NextRequest) {
  const body: { message: string; author: string; supportType: SupportType } = await req.json();
  const { message, supportType } = body;
  const client = new net.Socket();
  let userAgent = "";
  if (supportType === "sales") {
    userAgent =
      process.env.ALLOWED_USER_AGENT_ID ||
      "NEUROTAP-v0.2-BEG!---32FM01102030H1F2959294214553233!---";
  } else {
    const staffUsers = await prisma.staffUser.findMany();
    // Select random staff id
    const randomStaffUser = staffUsers[Math.floor(Math.random() * staffUsers.length)];
    userAgent = `NEUROTAP-v0.2-BEG!---${randomStaffUser.id}!---`;
  }

  const job: JobType = {
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
