import { gql } from "apollo-boost";
import styled from "styled-components";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import SlidingCards from "../components/SlidingCards/SlidingCards";

const DISCOVER_MOVIES_QUERY = gql`
  query DISCOVER_MOVIES_QUERY {
    discoverMovies {
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

const DISCOVER_SERIES_QUERY = gql`
  query DISCOVER_SERIES_QUERY {
    discoverSeries {
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

const Container = styled.div`
  display: grid;
  grid-template-areas: "jumbotron" "sections";
  grid-template-rows: 1fr auto;
  height: 100%;
`;

const Sections = styled.div`
  grid-area: sections;
  display: grid;
  grid-template-areas: "movies" "series";
  grid-template-rows: auto auto;
`;

const Index = ({ movies, series }) => {
  return (
    <Container>
      <Jumbotron data={{ movies, series }} />
      <Sections>
        <SlidingCards title="Latest Movies" data={movies} />
        <SlidingCards title="Latest Series" data={series} />
      </Sections>
    </Container>
  );
};

Index.getInitialProps = async ({ apolloClient }) => {
  const movies = await apolloClient.query({ query: DISCOVER_MOVIES_QUERY });
  const series = await apolloClient.query({ query: DISCOVER_SERIES_QUERY });
  return {
    movies: movies.data.discoverMovies.results,
    series: series.data.discoverSeries.results
  };
};

export default Index;
