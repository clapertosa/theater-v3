import MediaList from "../../containers/MediaList";
import { AIRING_TODAY_ON_TV } from "../../apollo/queries";

const Popular = ({ initialData }) => {
  return (
    <MediaList
      initialData={initialData}
      query={AIRING_TODAY_ON_TV}
      mediaType="series"
    />
  );
};

Popular.getInitialProps = async ({ apolloClient }) => {
  const res = await apolloClient.query({
    query: AIRING_TODAY_ON_TV
  });
  return { initialData: res.data.airingTodayOnTv };
};

export default Popular;
