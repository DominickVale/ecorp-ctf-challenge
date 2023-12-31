import prisma from "@/lib/prisma";
import builder from "@/pages/api/builder";
import "./mutations"

builder.prismaObject("Client", {
    findUnique: (client) => ({id: client.id}),
    fields: (t) => ({
        id: t.exposeID('id'),
        name: t.exposeString('name'),
        surname: t.exposeString('surname'),
        age: t.exposeInt('age'),
        gender: t.exposeString("gender"),
        bank: t.exposeInt("bank"),
        friends: t.exposeInt("friends"),
        status: t.exposeString("status"),
        healthy: t.exposeBoolean("healthy"),
        mood: t.exposeString("mood"),
        photo: t.exposeString("photo"),
    }),
});

builder.prismaObject("StaffUser", {
    fields: (t) => ({
        id: t.exposeID('id'),
        username: t.exposeString('username'),
        password: t.exposeString('password'),
        securityQuestion: t.exposeString('securityQuestion'),
        level: t.exposeInt('level')
    }),
});

builder.queryFields((t) => ({
    getClient: t.prismaField({
        type: 'Client',
        nullable: true,
        args: {
            id: t.arg.string({required: true}),
        },
        resolve: async (query, root, args, ctx, info) =>
            prisma.client.findUniqueOrThrow({
                ...query,
                where: {id: args.id},
            })

    }),
}))

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

builder.queryField('getStaffUser', (t) =>
    t.prismaField({
        type: 'StaffUser',
        args: {
            id: t.arg.string({required: true}),
        },
        resolve: async (query, _parent, args, _info) =>
            prisma.staffUser.findUniqueOrThrow({
                ...query,
                where: {id: args.id}
            })
    })
)

export const schema = builder.toSchema()
