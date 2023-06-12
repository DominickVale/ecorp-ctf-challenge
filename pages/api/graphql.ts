import {schema} from "@/pages/api/schema";
import {ApolloServer} from "@apollo/server";
import {startServerAndCreateNextHandler} from "@as-integrations/next";

export const dynamic = true;
const server = new ApolloServer({
    schema,
    introspection: process.env.NODE_ENV === 'development',
});

export default startServerAndCreateNextHandler(server, {
    context: async (req, res) => ({req, res}),
});
