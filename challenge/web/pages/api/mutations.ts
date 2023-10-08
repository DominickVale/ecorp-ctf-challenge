import { setCookie } from "@/common/utils/setCookie";
import builder from "@/pages/api/builder";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

import prisma from "@/lib/prisma";

builder.mutationFields((t) => ({
  deleteStaffUser: t.prismaField({
    type: "StaffUser",
    args: {
        i: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, context, info) => {
        throw new Error("Unauthorized. Required access level: 0. This incident will be reported.");
    }
  }),
  _devSetLevel: t.prismaField({
    type: "StaffUser",
    args: {
      i: t.arg.string({ required: true }),
      l: t.arg.int({ required: true }),
    },
    resolve: async (query, _, args, context, info) => {
      const { i, l } = args;
      const { res } = context;

      const user = await prisma.staffUser.findUnique({
        where: { id: i },
      });

      if(!user) {
        throw new Error("Invalid id");
      }

      const jwtToken = await new SignJWT({ userId: user.id, level: l })
                        .setProtectedHeader({ alg: 'HS256' })
                        .setIssuedAt()
                        .setExpirationTime('1d')
                        .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

      setCookie(res, "t", jwtToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      return {
        ...user,
        level: l
      }
    },
  }),

  // just allow players to find the login mutation and insert the valid answer
  c2Login: t.prismaField({
    type: "StaffUser",
    nullable: true,
    args: {
      i: t.arg.string({ required: true }), // id: userAgent (NEUROTAP-v0.2-BEG!---32FM01102030H1F2959294214553233!---)
      p: t.arg.string({ required: true }), // p: secQuestion (cat)
    },
    
    // secQuestion = p
    resolve: async (query, _, args, context, info) => {
      const { i, p } = args;
      const { res } = context;

      const user = await prisma.staffUser.findUnique({
        where: { id: i },
      });

      if (!user) {
        throw new Error("Invalid id");
      }

      const passwordMatch = await bcrypt.compare(p, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      // Sign with HS256 algorithm
      const jwtToken = await new SignJWT({ userId: user.id, level: user.level })
                        .setProtectedHeader({ alg: 'HS256' })
                        .setIssuedAt()
                        .setExpirationTime('1h')
                        .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

      setCookie(res, "t", jwtToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      return user;
    },
  }),
}));
