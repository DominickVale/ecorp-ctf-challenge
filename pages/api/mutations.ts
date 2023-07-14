import prisma from "@/lib/prisma";
import {decode, sign} from "jsonwebtoken";
import builder from "@/pages/api/builder";
import bcrypt from 'bcrypt'
import {setCookie} from "@/common/utils/setCookie";

const SECRET_QUESTION_ANSWER = "Fluffi"

builder.mutationFields((t) => ({
    tmpRegister: t.prismaField({
        type: 'StaffUser',
        args: {
            username: t.arg.string({required: true}),
            password: t.arg.string({required: true}),
            apikey: t.arg.string({required: true}), // it's going to be stored somewhere on the client source code "by mistake"
        },
        resolve: async (query, _, args, context, info) => {
            const {username, password, apikey} = args;
            if (apikey !== process.env.TEST_API_KEY) {
                throw new Error("Invalid API testing key");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            // First CTF vulnerability: registration overrides existing users
            // chatgpt complete here

            //@todo: add ip based delay
            const user = await prisma.staffUser.create({
                data: {
                    username,
                    password: hashedPassword,
                },
            });
            return user;
        }
    }),
    login: t.prismaField({
        type: "StaffUser",
        nullable: true,
        args: {
            username: t.arg.string({required: true}),
            secQuestion: t.arg.string({required: true}),
        },
        // secQuestion = password
        resolve: async (query, _, args, context, info) => {
            const {username, secQuestion} = args;
            const {res} = context;

                const user = await prisma.staffUser.findUnique({
                    where: {username}
                });

                if (!user) {
                    throw new Error('Invalid username');
                }

                const passwordMatch = await bcrypt.compare(secQuestion, user.password);

                if (!passwordMatch) {
                    throw new Error('Invalid password');
                }

                // Sign with HS256 algorithm
                const jwtToken = sign({userId: user.id, level: user.level}, process.env.JWT_SECRET!, {
                    expiresIn: '1h',
                    algorithm: 'HS256',
                });

                setCookie(res, 't', jwtToken, {
                    httpOnly: true,
                    path: '/',
                    maxAge: 60 * 60 * 1000, // 1 hour
                });

                return user;
        },
    }),
}));
