import { gql } from "apollo-boost";
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
