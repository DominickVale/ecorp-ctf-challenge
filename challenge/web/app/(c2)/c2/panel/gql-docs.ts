// noinspection GraphQLUnresolvedReference

import { gql } from "graphql-request";

// purposefully made harder to read :), it's too easy of a challenge
export const GetStaffUserDoc = gql`
    query gsu($id: String!) {
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
        oldLogin(p: $p, i: $i) {
            id
        }
    }
`;

export const GetClientsDoc = gql`
    query gcl {
        getClientsList {
            id
            name
            surname
            age
            gender
            bank
            friends
            status
            healthy
            mood
            photo
        }
    }
`;

export const DeleteStaffDoc = gql`
    mutation d($i: String!) {
        deleteStaffUser(i: $i) {
            id
            level
            username
        }
    }
`;

export const _DevSetLevelDoc = gql`
    mutation s($i: String!, $l: Int!) {
        _devSetLevel(i: $i, l: $l) {
            id
            level
            username
        }
    }
`;
