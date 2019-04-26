import MediaList from "../../containers/MediaList";
import { NOW_PLAYING_MOVIES } from "../../apollo/queries";

const Popular = ({ initialData }) => {
  return (
    <MediaList
      initialData={initialData}
      query={NOW_PLAYING_MOVIES}
      mediaType="movie"
    />
  );
};

Popular.getInitialProps = async ({ apolloClient }) => {
  const res = await apolloClient.query({
    query: NOW_PLAYING_MOVIES,
    variables: { media_type: "movie" }
  });
  return { initialData: res.data.nowPlayingMovies };
};

export default Popular;
