import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import prisma from "@/lib/prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from "@prisma/client";

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
        dmmf: Prisma.dmmf
    }
})


export default builder

// We create empty root query, mutation, and subscription
// because we'll define individual nodes in other files
// since those nodes can have multiple resolvers and possibly
// can lead to really large and hard to read/navigate files
builder.queryType();
builder.mutationType();
