import MediaList from "../../containers/MediaList";
import { ON_TV_QUERY } from "../../apollo/queries";

const Popular = ({ initialData }) => {
  return (
    <MediaList
      initialData={initialData}
      query={ON_TV_QUERY}
      mediaType="series"
    />
  );
};

Popular.getInitialProps = async ({ apolloClient }) => {
  const res = await apolloClient.query({
    query: ON_TV_QUERY
  });
  return { initialData: res.data.onTv };
};

export default Popular;
