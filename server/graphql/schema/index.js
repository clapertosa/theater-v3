const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  # User
  type User {
    id: ID!
    nickname: String!
    email: String!
    avatar: String
    activated: Boolean!
    reset_token: String
    reset_token_expiration: String
    created_at: String!
    updated_at: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  # Configuration
  # Root Query
  type RootQuery {
    # User
    getUser: String
  }

  # Root Mutation
  type RootMutation {
    login(email: String! password: String!): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
