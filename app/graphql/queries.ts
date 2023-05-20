import {gql} from 'graphql-request'

export const TEST = gql`
	query hello {
    hello
	}
`;

export const getClientsList = gql`
  query GetClientsList {
    clients {
      id
      name
      surname
      age
      heartrate
      o2
      // other medical and psychological data
    }
  }
}`;

export const getClientData = gql`
  query GetClientData($clientId: ID!) {
    client(id: $clientId) {
      id
      name
      surname
      age
      heartrate
      o2
      // other medical and psychological data
    }
  }
}`;
