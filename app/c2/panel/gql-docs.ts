// noinspection GraphQLUnresolvedReference

import {gql} from "graphql-request";

// purposefully made harder to read :), it's too easy of a challenge
export const GetStaffUserDoc = gql`
    query g($i: String!) {
        getStaffUser(id: $i) {
            level
            username
            securityQuestion
            id
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
