import {createYoga} from 'graphql-yoga'
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";

import { v4 as uuidv4 } from 'uuid';

import type PrismaTypes from "@pothos/plugin-prisma/generated";
import type {NextApiRequest, NextApiResponse} from 'next'

import prisma from '../../lib/prisma'
import {compare} from "bcrypt";
import {setCookie} from "@/common/utils/setCookie";
import {sign} from "jsonwebtoken";

const builder = new SchemaBuilder<{
    Context: {
        req: NextApiRequest;
        res: NextApiResponse;
    }
    PrismaTypes: PrismaTypes;
}>({
    plugins: [PrismaPlugin],
    prisma: {
        client: prisma,
    }
})

enum StaffUserRole {
    TESTER = "TESTER",
    DEFAULT = "DEFAULT",
    ADMIN = "ADMIN",
}

// We create empty root query, mutation, and subscription
// because we'll define individual nodes in other files
// since those nodes can have multiple resolvers and possibly
// can lead to really large and hard to read/navigate files
builder.queryType({});
// builder.mutationType({});
// builder.subscriptionType({});

builder.enumType(StaffUserRole, {
    name: 'StaffUserRole',
});

builder.prismaObject("Client", {
    fields: (t) => ({
        id: t.exposeID('id'),
        name: t.exposeString('name'),
        surname: t.exposeString('surname'),
        age: t.exposeInt('age'),
        heartrate: t.exposeInt('heartrate'),
        o2: t.exposeInt('o2'),
    }),
});

builder.prismaObject("StaffUser", {
    fields: (t) => ({
        id: t.exposeID('id'),
        username: t.exposeString('username'),
        password: t.exposeString('password'),
        role: t.field({
            type: StaffUserRole,
            resolve: (u) => u.role as StaffUserRole
        })
    }),
});


builder.queryField('getClient', (t) =>
    t.prismaField({
        type: 'Client',
        args: {
            id: t.arg.string({required: true}),
        },
        nullable: true,
        resolve: async (query, _parent, args, _info) =>
            prisma.client.findUnique({
                where: {
                    id: args.id
                }
            })
    })
)

builder.queryField('getClientsList', (t) =>
    t.prismaField({
        type: ['Client'],
        resolve: async (query, _parent, _args, _info) =>
            prisma.client.findMany({
                ...query,
            })
    })
)

builder.queryField('getStaffList', (t) =>
    t.prismaField({
        type: ['StaffUser'],
        resolve: async (query, _parent, _args, _info) =>
            prisma.staffUser.findMany({
                ...query,
            })
    })
)


builder.mutationType({
    fields: (t) => ({
        login: t.field({
            type: 'Boolean',
            args: {
                username: t.arg.string({required: true}),
                password: t.arg.string({required: true}),
            },
            resolve: async (parent, args, {req, res}, info) => {
                const {username, password} = args;
                const user = await prisma.staffUser.findUnique({where: {username}});

                if (!user) {
                    throw new Error('Invalid username');
                }

                const passwordMatch = await compare(password, user.password);

                if (!passwordMatch) {
                    throw new Error('Invalid password');
                }

                const token = sign({userId: user.id, role: user.role}, 'secret', {
                    expiresIn: '1h',
                });

                setCookie(res, 'token', token, {
                    httpOnly: true,
                    maxAge: 1 * 60 * 60 * 1000, // 1 hour
                })

                return true;
            }
        }),
        forgotPassword: t.field({
            type: 'Boolean',
            args: {
                username: t.arg.string({ required: true }),
                //todo security questions
            },
            resolve: async (_parent, args) => {
                const { username } = args;
                const user = await prisma.staffUser.findUnique({ where: { username } });

                if (!user) {
                    throw new Error('Invalid email');
                }

                const resetToken = uuidv4();
                // Save the reset token in the database or send it via email to the user

                return true;
            },
        }),
    }),
});

const schema = builder.toSchema()

const {handleRequest} = createYoga<{
    req: NextApiRequest
    res: NextApiResponse
}>({
    graphqlEndpoint: "/graphql",
    schema,
    context: (ctx) => ({
        ...ctx,
        prisma,
    }),
    fetchAPI: {
        Request: Request,
        Response: Response,
    },
})

export {handleRequest as GET, handleRequest as POST};
