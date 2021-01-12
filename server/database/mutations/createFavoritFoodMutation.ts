import { gql } from 'graphql-request';

export const createFavoritFoodMutation = gql`
mutation createFavoritFood($favoriteFoodOrBeer: String!, $email: String!) {
    createFavoritfood(
      input: {favoritfood: {favoritefoodorbeer: $favoriteFoodOrBeer, email: $email}}
    ) {
      clientMutationId
    }
  }
  
`;