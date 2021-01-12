import { gql } from 'graphql-request';

export const createFavoritFoodOptionsMutation = gql`
mutation createFavoritfoodoption($key: String!, $value: String!) {
  createFavoritfoodoption(input: {favoritfoodoption: {key: $key, value: $value}}) {
    clientMutationId
  }
}
`;
