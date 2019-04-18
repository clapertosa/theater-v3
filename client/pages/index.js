import styled from "styled-components";
import { HOME_MOVIES_QUERY, HOME_SERIES_QUERY } from "../apollo/queries";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import SlidingCards from "../components/SlidingCards/SlidingCards";

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
  const movies = await apolloClient.query({ query: HOME_MOVIES_QUERY });
  const series = await apolloClient.query({ query: HOME_SERIES_QUERY });
  return {
    movies: movies.data.homeMovies.results,
    series: series.data.homeSeries.results
  };
};

export default Index;
