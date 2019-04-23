import SingleMedia from "../containers/SingleMedia";
import { sortData } from "../utils/components/singleMedia";
import { MOVIE_QUERY } from "../apollo/queries";

const Movies = ({ data }) => {
  return <SingleMedia data={data} />;
};

Movies.getInitialProps = async ({ apolloClient, query }) => {
  const res = await apolloClient.query({
    query: MOVIE_QUERY,
    variables: { id: query.id }
  });
  const sortedData = { ...sortData(res.data.movie), mediaType: "movie" };
  return { data: sortedData };
};

export default Movies;
