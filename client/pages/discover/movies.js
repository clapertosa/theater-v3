import React from "react";
import Head from "next/head";
import DiscoverMovies from "../../containers/DiscoverMovies";
import { DISCOVER_MOVIES_QUERY } from "../../apollo/queries";

const Movies = ({ initialData }) => {
  return (
    <>
      <Head>
        <title>🎬 Theater - Discover Movies</title>
      </Head>
      <DiscoverMovies mediaType="movie" initialData={initialData} />
    </>
  );
};

Movies.getInitialProps = async ({ apolloClient }) => {
  const res = await apolloClient.query({ query: DISCOVER_MOVIES_QUERY });
  return { initialData: res.data.discoverMovies };
};

export default Movies;
