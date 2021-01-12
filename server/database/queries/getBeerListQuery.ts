import { gql } from 'graphql-request';

export const getBeerListQuery = gql`
    query getAllBeerlists {
        allBeerlists {
            nodes {
            beername
            nodeId
        }
    }
    }
`;