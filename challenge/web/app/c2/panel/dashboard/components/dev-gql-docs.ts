// noinspection GraphQLUnresolvedReference

import {gql} from "graphql-request/build/cjs";

export const LoginDoc = gql`
    mutation DeleteStaffUser($i: String!) {
        deleteStaffUser(i: $i) {
            id
        }
    }
`;
