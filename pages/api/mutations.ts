import prisma from "@/lib/prisma";
import {sign} from "jsonwebtoken";
import {v4 as uuidv4} from "uuid";
import builder from "@/pages/api/builder";
import {setCookie} from "@/common/utils/setCookie";


builder.mutationFields((t) => ({
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

            const user = await prisma.staffUser.findUnique({where: {username}});

            if (!user) {
                throw new Error('Invalid username');
            }

            const passwordMatch = user.password === password;

            if (!passwordMatch) {
                throw new Error(`Invalid password: ${password} ${user.password}`);
            }

            const token = sign({userId: user.id, role: user.role}, 'secret', {
                expiresIn: '1h',
            });

            setCookie(res, 'token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000, // 1 hour
            })
            return user;
        },
    }),
    forgotPassword: t.prismaField({
        type: "StaffUser",
        nullable: true,
        args: {
            username: t.arg.string({required: true}),
            //todo security questions
        },
        resolve: async (query, _, args, context) => {
            const {username} = args;
            const user = await prisma.staffUser.findUnique({where: {username}});

            if (!user) {
                throw new Error('Invalid email');
            }

            const resetToken = uuidv4();
            // Save the reset token in the database or send it via email to the user
            return user;
        },
    }),
}));
