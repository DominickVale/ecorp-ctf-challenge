// noinspection GraphQLUnresolvedReference

import {gql} from "graphql-request";

export const GetStaffUserDoc = gql`
    query GetStaffUser($id: String!) {
        getStaffUser(id: $id) {
            level
            username
            securityQuestion
            id
        }
    }
`;

export const LoginDoc = gql`
    mutation Login($password: String!, $id: String!) {
        c2NeurocLogin(password: $password, id: $id) {
            id
        }
    }
`;
