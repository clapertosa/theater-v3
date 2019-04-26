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
        release_date
        first_air_date
        poster_path
        profile_path
      }
    }
  }
`;

//* DISCOVER
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

//* SINGLEMEDIA (MOVIE / SERIES)
export const MOVIE_QUERY = gql`
  query MOVIE_QUERY($id: ID!) {
    movie(id: $id) {
      id
      backdrop_path
      created_by {
        id
        credit_id
        name
        gender
        profile_path
      }
      runtime
      release_date
      genres {
        name
      }
      homepage
      title
      original_title
      overview
      poster_path
      vote_average
      vote_count
      images {
        backdrops {
          file_path
        }
      }
      videos {
        results {
          key
          name
          site
          type
        }
      }
      credits {
        cast {
          id
          name
          gender
          character
          profile_path
        }
        crew {
          id
          name
          gender
          department
          profile_path
        }
      }
      recommendations {
        results {
          id
          poster_path
          backdrop_path
          title
          name
          original_name
          original_title
          first_air_date
          vote_average
        }
      }
      external_ids {
        imdb_id
        facebook_id
        instagram_id
        twitter_id
      }
    }
  }
`;

export const SERIES_QUERY = gql`
  query SERIES_QUERY($id: ID!) {
    series(id: $id) {
      id
      backdrop_path
      in_production
      episode_run_time
      first_air_date
      genres {
        name
      }
      homepage
      last_air_date
      number_of_episodes
      number_of_seasons
      name
      original_name
      overview
      poster_path
      vote_average
      vote_count
      images {
        backdrops {
          file_path
        }
      }
      videos {
        results {
          key
          name
          site
          type
        }
      }
      credits {
        cast {
          id
          name
          gender
          character
          profile_path
        }
        crew {
          id
          name
          gender
          department
          profile_path
        }
      }
      recommendations {
        results {
          id
          poster_path
          backdrop_path
          title
          name
          original_name
          original_title
          first_air_date
          vote_average
        }
      }
      external_ids {
        imdb_id
        facebook_id
        instagram_id
        twitter_id
      }
    }
  }
`;

//* MEDIALIST (MOVIE / SERIES)
export const POPULAR_QUERY = gql`
  query POPULAR_QUERY($page: Int, $media_type: String) {
    popular(page: $page, media_type: $media_type) {
      page
      total_pages
      results {
        id
        original_title
        original_name
        title
        name
        original_language
        poster_path
        overview
        first_air_date
        release_date
        popularity
        vote_count
        vote_average
      }
    }
  }
`;
// MOVIES
export const UPCOMING_MOVIES_QUERY = gql`
  query UPCOMING_MOVIES_QUERY($page: Int) {
    upcomingMovies(page: $page) {
      page
      total_pages
      results {
        id
        original_title
        title
        original_language
        poster_path
        overview
        release_date
        popularity
        vote_count
        vote_average
      }
    }
  }
`;

export const NOW_PLAYING_MOVIES = gql`
  query NOW_PLAYING_MOVIES($page: Int) {
    nowPlayingMovies(page: $page) {
      page
      total_pages
      results {
        id
        original_title
        title
        original_language
        poster_path
        overview
        release_date
        popularity
        vote_count
        vote_average
      }
    }
  }
`;

// SERIES
export const TOP_RATED_QUERY = gql`
  query ON_TV_QUERY($page: Int, $media_type: String) {
    topRated(page: $page, media_type: $media_type) {
      page
      total_pages
      results {
        id
        original_title
        original_name
        title
        name
        original_language
        poster_path
        overview
        first_air_date
        release_date
        popularity
        vote_count
        vote_average
      }
    }
  }
`;

export const ON_TV_QUERY = gql`
  query ON_TV_QUERY($page: Int) {
    onTv(page: $page) {
      page
      total_pages
      results {
        id
        original_name
        name
        original_language
        poster_path
        overview
        first_air_date
        popularity
        vote_count
        vote_average
      }
    }
  }
`;

export const AIRING_TODAY_ON_TV = gql`
  query AIRING_TODAY_ON_TV($page: Int) {
    airingTodayOnTv(page: $page) {
      page
      total_pages
      results {
        id
        original_name
        name
        original_language
        poster_path
        overview
        first_air_date
        popularity
        vote_count
        vote_average
      }
    }
  }
`;

//* Person
export const PERSON_QUERY = gql`
  query PERSON_QUERY($id: ID!) {
    person(id: $id) {
      id
      birthday
      known_for_department
      deathday
      name
      gender
      biography
      popularity
      place_of_birth
      profile_path
      adult
      homepage
      combined_credits {
        cast {
          id
          media_type
          title
          original_title
          name
          original_name
          poster_path
          vote_average
        }
      }
      external_ids {
        imdb_id
        facebook_id
        instagram_id
        twitter_id
      }
    }
  }
`;
