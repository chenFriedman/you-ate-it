import { gql } from 'graphql-request';

export const createUserMutation = gql`
mutation createUser($email: String!) {
    createUser(input: {
        user: {
            email: $email
        }
    }) 
    {
      clientMutationId
    }
  }
`;
