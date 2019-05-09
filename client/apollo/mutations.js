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

export const NEW_PASSWORD_MUTATION = gql`
  mutation NEW_PASSWORD_MUTATION($email: String!) {
    newPassword(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $token: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      token: $token
      password: $password
      confirmPassword: $confirmPassword
    )
  }
`;

//* User
export const ADD_TO_FAVORITES_MUTATION = gql`
  mutation ADD_TO_FAVORITES_MUTATION(
    $media_id: ID!
    $media_type: String!
    $title: String!
    $poster_path: String
  ) {
    addToFavorites(
      media_id: $media_id
      media_type: $media_type
      title: $title
      poster_path: $poster_path
    )
  }
`;

export const REMOVE_FROM_FAVORITES_MUTATION = gql`
  mutation REMOVE_FROM_FAVORITES_MUTATION($media_id: ID!) {
    removeFromFavorites(media_id: $media_id)
  }
`;
