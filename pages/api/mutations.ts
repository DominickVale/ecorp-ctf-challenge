import { setCookie } from "@/common/utils/setCookie";
import builder from "@/pages/api/builder";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

import prisma from "@/lib/prisma";

builder.mutationFields((t) => ({
  // just allow players to find the login mutation and insert the valid answer
  c2NeurocLogin: t.prismaField({
    type: "StaffUser",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }), // id: userAgent (NEUROTAP-v0.2-BEG!---32FM01102030H1F2959294214553233!---)
      password: t.arg.string({ required: true }), // password: secQuestion (cat)
    },
    // secQuestion = password
    resolve: async (query, _, args, context, info) => {
      const { id, password } = args;
      const { res } = context;

      const user = await prisma.staffUser.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error("Invalid id");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      // Sign with HS256 algorithm
      const jwtToken = sign({ userId: user.id, level: user.level }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
        algorithm: "HS256",
      });

      setCookie(res, "t", jwtToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      return user;
    },
  }),
}));
