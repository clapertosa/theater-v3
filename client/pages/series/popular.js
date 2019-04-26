import MediaList from "../../containers/MediaList";
import { POPULAR_QUERY } from "../../apollo/queries";

const Popular = ({ initialData }) => {
  return (
    <MediaList
      initialData={initialData}
      query={POPULAR_QUERY}
      mediaType="series"
    />
  );
};

Popular.getInitialProps = async ({ apolloClient }) => {
  const res = await apolloClient.query({
    query: POPULAR_QUERY,
    variables: { media_type: "series" }
  });
  return { initialData: res.data.popular };
};

export default Popular;
