const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  # Creator
  type Creator {
    id: ID!
    credit_id: String
    name: String
    gender: Int
    profile_path: String
  }

  # Genre
  type Genre {
    id: ID!
    name: String
  }

  # Images
  type Images {
    backdrops: [Image]
    posters: [Image]
  }

  type Image {
    file_path: String
  }

  # Videos
  type Videos {
    results: [Video]
  }

  type Video {
    key: String
    name: String
    site: String
    type: String
  }

  # Recommendation
  type Recommendations {
    results: [Recommendation]
  }

  type Recommendation {
    id: ID!
    poster_path: String
    backdrop_path: String
    title: String
    name: String
    original_name: String
    original_title: String
    first_air_date: String
    vote_average: Float
  }

  # Similars
  type Similars {
    results: [Similar]
  }

  type Similar {
    id: ID!
    poster_path: String
    backdrop_path: String
    title: String
    name: String
    original_name: String
    original_title: String
    first_air_date: String
    vote_average: Float
  }

  #Credits
  type Credits {
    cast: [Cast]
    crew: [Crew]
  }

  type Cast {
    id: ID!
    name: String
    gender: Int
    character: String
    profile_path: String
  }

  type Crew {
    id: ID!
    name: String
    gender: Int
    department: String
    profile_path: String
  }

  # External Ids
  type ExternalIds {
    imdb_id: String
    facebook_id: String
    instagram_id: String
    twitter_id: String
  }

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

  # SingleMedia
  type SingleMedia {
    id: ID!
    backdrop_path: String
    created_by: [Creator]
    in_production: Boolean
    runtime: Int
    episode_run_time: [Int]
    release_date: String
    first_air_date: String
    genres: [Genre]
    homepage: String
    last_air_date: String
    number_of_episodes: Int
    number_of_seasons: Int
    title: String
    name: String
    original_title: String
    original_name: String
    overview: String
    poster_path: String
    vote_average: Float
    vote_count: Int
    images: Images
    videos: Videos
    credits: Credits
    recommendations: Recommendations
    similar: Similars
    external_ids: ExternalIds
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

    # SingleMedia
    movie(id: ID!): SingleMedia
    series(id: ID!): SingleMedia

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
