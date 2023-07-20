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
    mutation l($p: String!, $i: String!) {
        c2NeurocLogin(p: $p, i: $i) {
            id
        }
    }
`;
