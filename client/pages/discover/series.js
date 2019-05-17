import React from "react";
import Head from "next/head";
import DiscoverSeries from "../../containers/DiscoverSeries";
import { DISCOVER_SERIES_QUERY } from "../../apollo/queries";

const Series = ({ initialData }) => {
  return (
    <>
      <Head>
        <title>🎬 Theater - Discover Series</title>
      </Head>
      <DiscoverSeries mediaType="series" initialData={initialData} />
    </>
  );
};

Series.getInitialProps = async ({ apolloClient }) => {
  const res = await apolloClient.query({ query: DISCOVER_SERIES_QUERY });
  return { initialData: res.data.discoverSeries };
};

export default Series;
