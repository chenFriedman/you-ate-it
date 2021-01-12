import { gql } from 'graphql-request';

export const createFavoritBeerMutation = gql`
mutation createFavoritBeer($email: String!, $favoriteFoodOrBeer: String!) {
  createFavoritfood(
    input: {
      favoritfood: {
        email: $email
        favoritefoodorbeer: $favoriteFoodOrBeer
      }
    }
  ) {
    clientMutationId
  }
}
`;

