import { gql } from "apollo-boost";

//* USER
// AUTH
export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $username: String!
    $email: String!
    $confirmEmail: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      input: {
        username: $username
        email: $email
        confirmEmail: $confirmEmail
        password: $password
        confirmPassword: $confirmPassword
      }
    )
  }
`;

export const ACTIVATE_ACCOUNT_MUTATION = gql`
  mutation ACTIVATE_ACCOUNT_MUTATION($token: String!) {
    activateAccount(token: $token)
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

export const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signOut
  }
`;
