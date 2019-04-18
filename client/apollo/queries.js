import { gql } from "apollo-boost";

//* HOME (index)
export const HOME_MOVIES_QUERY = gql`
  query HOME_MOVIES_QUERY {
    homeMovies {
      results {
        id
        original_title
        original_name
        title
        name
        original_language
        poster_path
        backdrop_path
        adult
        overview
        first_air_date
        release_date
        genre_ids
        popularity
        vote_count
        vote_average
      }
    }
  }
`;

export const HOME_SERIES_QUERY = gql`
  query HOME_SERIES_QUERY {
    homeSeries {
      results {
        id
        original_title
        original_name
        title
        name
        original_language
        poster_path
        backdrop_path
        adult
        overview
        first_air_date
        release_date
        genre_ids
        popularity
        vote_count
        vote_average
      }
    }
  }
`;

//* SEARCHBAR
export const SEARCH_QUERY = gql`
  query SEARCH_QUERY($query: String) {
    search(query: $query) {
      results {
        id
        name
        original_name
        title
        original_title
        media_type
        poster_path
        profile_path
      }
    }
  }
`;

// DISCOVER
// Discover Movies
export const DISCOVER_MOVIES_QUERY = gql`
  query DISCOVER_MOVIES_QUERY(
    $page: Int
    $release_year: String
    $sort_by: String
    $with_genres: String
    $with_cast: String
  ) {
    discoverMovies(
      input: {
        page: $page
        release_year: $release_year
        sort_by: $sort_by
        with_genres: $with_genres
        with_cast: $with_cast
      }
    ) {
      page
      total_pages
      total_results
      results {
        id
        title
        original_title
        release_date
        vote_average
        overview
        poster_path
        media_type
      }
    }
  }
`;

export const SEARCH_CAST_QUERY = gql`
  query SEARCH_CAST_QUERY($query: String) {
    searchCast(query: $query) {
      results {
        id
        name
        profile_path
      }
    }
  }
`;

// Discover Series
export const DISCOVER_SERIES_QUERY = gql`
  query DISCOVER_SERIES_QUERY(
    $page: Int
    $release_year: String
    $sort_by: String
    $with_genres: String
    $without_genres: String
  ) {
    discoverSeries(
      input: {
        page: $page
        release_year: $release_year
        sort_by: $sort_by
        with_genres: $with_genres
        without_genres: $without_genres
      }
    ) {
      page
      total_pages
      total_results
      results {
        id
        name
        original_name
        first_air_date
        vote_average
        overview
        poster_path
        media_type
      }
    }
  }
`;
