import SingleMedia from "../containers/SingleMedia";
import { sortData } from "../utils/components/singleMedia";
import { SERIES_QUERY } from "../apollo/queries";

const Series = ({ data }) => {
  return <SingleMedia data={data} />;
};

Series.getInitialProps = async ({ apolloClient, query }) => {
  const res = await apolloClient.query({
    query: SERIES_QUERY,
    variables: { id: query.id }
  });
  const sortedData = { ...sortData(res.data.series), mediaType: "series" };
  return { data: sortedData };
};

export default Series;
