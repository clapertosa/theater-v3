import React from "react";
import Head from "next/head";
import MediaList from "../../containers/MediaList";
import { UPCOMING_MOVIES_QUERY } from "../../apollo/queries";

const Popular = ({ initialData }) => {
  return (
    <>
      <Head>
        <title>🎬 Theater - Upcoming Movies</title>
      </Head>
      <MediaList
        initialData={initialData}
        query={UPCOMING_MOVIES_QUERY}
        mediaType="movie"
      />
    </>
  );
};

Popular.getInitialProps = async ({ apolloClient }) => {
  const res = await apolloClient.query({
    query: UPCOMING_MOVIES_QUERY
  });
  return { initialData: res.data.upcomingMovies };
};

export default Popular;
