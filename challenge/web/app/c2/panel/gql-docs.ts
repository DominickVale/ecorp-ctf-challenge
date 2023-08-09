// noinspection GraphQLUnresolvedReference

import {gql} from "graphql-request";

// purposefully made harder to read :), it's too easy of a challenge
export const GetStaffUserDoc = gql`
    query GetStaffUser($id: String!) {
        getStaffUser(id: $id) {
            id
            level
            securityQuestion
            username
        }
    }
`;

export const LoginDoc = gql`
"""
Old version. Newer one uses the new c2 Neuroc tec. (Impl. is in api/mutations.ts)
"""
    mutation l($p: String!, $i: String!) {
        loginV1(p: $p, i: $i) {
            id
        }
    }
`;
