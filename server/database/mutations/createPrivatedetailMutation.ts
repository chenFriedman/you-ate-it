import { gql } from 'graphql-request';

export const createPrivatedetailsMutation = gql`
mutation createPrivatedetails($email: String!, $firstname: String!, $lastname: String!, $birthdate: Datetime!, $phone: String!, $id: String!) {
  createPrivatedetail(
      input: {privatedetail: {email: $email, firstname: $firstname, lastname: $lastname, birthdate: $birthdate, id: $id, phone: $phone}}
    ) {
      clientMutationId
    }
  }
`;