import React from "react";
import DiscoverSeries from "../../containers/DiscoverSeries";
import { DISCOVER_SERIES_QUERY } from "../../apollo/queries";

const Series = ({ initialData }) => {
  return <DiscoverSeries mediaType="series" initialData={initialData} />;
};

Series.getInitialProps = async ({ apolloClient }) => {
  const res = await apolloClient.query({ query: DISCOVER_SERIES_QUERY });
  return { initialData: res.data.discoverSeries };
};

export default Series;
