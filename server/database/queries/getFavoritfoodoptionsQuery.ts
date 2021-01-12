import { gql } from 'graphql-request';

export const getFavoritfoodoptionsQuery = gql`
    query getFavoritfoodoptions {
     allFavoritfoodoptions {
        nodes {
          id
          value
          key
        }
      }
    }
`;