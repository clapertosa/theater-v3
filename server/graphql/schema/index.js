const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  # Search
  type Search {
    page: Int!
    total_results: Int
    total_pages: Int
    results: [Result]
  }

  type Result {
    id: ID
    name: String
    original_name: String
    title: String
    original_title: String
    media_type: String
    poster_path: String
    profile_path: String
    vote_count: Int
    vote_average: Float
    first_air_date: String
    popularity: Float
    genre_ids: [Int]
  }

  # Discover
  type Discover {
    page: Int,
    total_results: Int,
    total_pages: Int,
    results: [DiscoveredMedia]
  }

  type DiscoveredMedia {
    id: ID!
    original_title: String
    original_name: String
    title: String
    name: String
    original_language: String
    poster_path: String
    backdrop_path: String
    adult: Boolean
    overview: String
    first_air_date: String
    release_date: String
    genre_ids: [Int]
    popularity: Float
    vote_count: Int
    vote_average: Float
  }

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
    # Search
    search(query: String): Search

    # Discover
    discoverMovies: Discover
    discoverSeries: Discover

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
