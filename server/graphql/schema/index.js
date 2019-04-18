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
    id: ID!
    media_type: String
    original_title: String
    original_name: String
    title: String
    name: String
    original_language: String
    poster_path: String
    profile_path: String
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

  # Discover
  type Discover {
    page: Int
    total_results: Int
    total_pages: Int
    results: [Result]
  }

  input DiscoverInput {
    page: Int
    release_year: String
    sort_by: String
    with_genres: String
    without_genres: String
    with_cast: String
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
    searchCast(query: String): Search

    # Home
    homeMovies: Discover!
    homeSeries: Discover!

    # Discover
    discoverMovies(input: DiscoverInput): Discover
    discoverSeries(input: DiscoverInput): Discover

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
