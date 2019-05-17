import React from "react";
import Head from "next/head";
import SingleMedia from "../containers/SingleMedia";
import { sortData } from "../utils/components/singleMedia";
import { SERIES_QUERY } from "../apollo/queries";

const Series = ({ data }) => {
  const year =
    data.releaseDate.indexOf("-") > 0
      ? data.releaseDate.substring(0, data.releaseDate.indexOf("-"))
      : data.releaseDate;
  const backdropPath =
    data.backdropPath === "/static/images/logo.svg"
      ? "https://theater-webapp.herokuapp.com/static/images/logo.jpg"
      : `https://image.tmdb.org/t/p/w1280${data.backdropPath}`;

  return (
    <>
      <Head>
        <meta
          name="og:title"
          property="og:title"
          content={`🎬 Theater - ${data.title}`}
        />
        <meta
          name="og:description"
          property="og:description"
          content={data.overview.substring(0, 200) || data.title}
        />
        <meta name="og:image" property="og:image" content={backdropPath} />
        <meta
          name="og:url"
          property="og:url"
          content={`https://theater-webapp.herokuapp.com/series?id=${data.id}`}
        />
        <title>
          🎬 Theater - {data.title} ({year})
        </title>
      </Head>
      <SingleMedia data={data} />
    </>
  );
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
