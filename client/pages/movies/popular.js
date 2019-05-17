import React from "react";
import Head from "next/head";
import MediaList from "../../containers/MediaList";
import { POPULAR_QUERY } from "../../apollo/queries";

const Popular = ({ initialData }) => {
  return (
    <>
      <Head>
        <title>🎬 Theater - Popular Movies</title>
      </Head>
      <MediaList
        initialData={initialData}
        query={POPULAR_QUERY}
        mediaType="movie"
      />
    </>
  );
};

Popular.getInitialProps = async ({ apolloClient }) => {
  const res = await apolloClient.query({
    query: POPULAR_QUERY,
    variables: { media_type: "movie" }
  });
  return { initialData: res.data.popular };
};

export default Popular;
