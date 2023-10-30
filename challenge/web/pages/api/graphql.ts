import { schema } from "@/pages/api/schema";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloArmor } from "@escape.tech/graphql-armor";
import { GraphQLError, ValidationContext } from "graphql";

export const dynamic = true;

const logRejection = (ctx: ValidationContext | null, error: GraphQLError) => {
    if (ctx) {
        console.log(`rejection context: ${ctx}`);
    }
    console.log(`rejected request: ${error}`);
};

const armor = new ApolloArmor({
    blockFieldSuggestion: {
        enabled: true,
    },
    costLimit: {
        onReject: [logRejection],
    },
    maxAliases: {
        onReject: [logRejection],
        n: 3,
    },
    maxDepth: {
        onReject: [logRejection],
        n: 2,
    },
    maxDirectives: {
        onReject: [logRejection],
    },
    maxTokens: {
        onReject: [logRejection],
        n: 90,
    },
});

const protection = armor.protect();

const server = new ApolloServer({
    schema,
    introspection: process.env.NODE_ENV === "development",
    ...protection,
    plugins: [
        ...(process.env.NODE_ENV === "development"
            ? []
            : [ApolloServerPluginLandingPageDisabled()]),
        ...protection.plugins,
    ],
    validationRules: [...protection.validationRules],
});

export default startServerAndCreateNextHandler(server, {
    context: async (req, res) => ({ req, res }),
});
