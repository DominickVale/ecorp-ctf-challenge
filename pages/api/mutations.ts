import prisma from "@/lib/prisma";
import {sign} from "jsonwebtoken";
import builder from "@/pages/api/builder";
import bcrypt from 'bcrypt'
import {setCookie} from "@/common/utils/setCookie";


builder.mutationFields((t) => ({
    tmpSetStaffUserLevel: t.prismaField({
        type: 'StaffUser',
        args: {
            username: t.arg.string({required: true}),
            level: t.arg.int({required: true}),
        },
        resolve: async (query, _, args, context, info) => {
            throw new Error("WIP while we figure out the safest way to do this; ETA 1 week");
        }
    }),
    tmpRegister: t.prismaField({
        type: 'StaffUser',
        args: {
            username: t.arg.string({required: true}),
            password: t.arg.string({required: true}),
            apikey: t.arg.string({required: true}), // it's going to be stored somewhere on the client source code "by mistake"
        },
        resolve: async (query, _, args, context, info) => {
            const {username, password, apikey} = args;
            if (apikey !== process.env.MOCK_API_KEY) {
                throw new Error("Invalid API testing key");
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            //@todo: add ip based delay
            const user = await prisma.staffUser.create({
                data: {
                    username,
                    password: hashedPassword,
                    level: 5, //5: minimum permissions, 1: maximum permissions
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
            password: t.arg.string({required: true}),
        },
        resolve: async (query, _, args, context, info) => {
            const {username, password} = args;
            const {res} = context;

            //@todo add delay

            const user = await prisma.staffUser.findUnique({
                where: {
                    username
                }
            });

            if (!user) {
                throw new Error('Invalid username');
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new Error('Invalid password');
            }

            const token = sign({userId: user.id, level: user.level}, 'secret', {
                expiresIn: '1h',
                algorithm: 'HS256',
            });

            setCookie(res, 'token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000, // 1 hour
            })
            return user;
        },
    }),
}));
