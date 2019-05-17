import React from "react";
import Head from "next/head";
import { default as PersonContainer } from "../containers/Person";
import { PERSON_QUERY } from "../apollo/queries";

const Person = ({ data }) => {
  const profilePath = `https://image.tmdb.org/t/p/h632${data.profile_path}`;

  return (
    <>
      <Head>
        <meta
          name="og:title"
          property="og:title"
          content={`🎬 Theater - ${data.name}`}
        />
        <meta
          name="og:description"
          property="og:description"
          content={data.biography.substring(0, 200) || data.name}
        />
        <meta name="og:image" property="og:image" content={profilePath} />
        <meta
          name="og:url"
          property="og:url"
          content={`https://theater-webapp.herokuapp.com/person?id=${data.id}`}
        />
        <title>🎬 Theater - {data.name}</title>
      </Head>
      <PersonContainer data={data} />
    </>
  );
};

Person.getInitialProps = async ({ apolloClient, query }) => {
  const res = await apolloClient.query({
    query: PERSON_QUERY,
    variables: { id: query.id }
  });

  return { data: res.data.person };
};

export default Person;
