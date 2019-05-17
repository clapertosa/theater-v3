import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";
import Layout from "../hoc/Layout/Layout";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <Head>
          <meta property="og:site_name" content="Theater" />
          <meta
            name="og:title"
            property="og:title"
            content="🎬 Theater - The best place for Movies 🎥 and Series 📺"
          />
          <meta
            name="og:description"
            property="og:description"
            content="🎬 Theater: the best resource to find info about movies, series and actors! You'll be able to sign up and save your favorites movies/series or watch their videos and images"
          />
          <meta
            name="description"
            content="🎬 Theater: the best resource to find info about movies, series and actors! You'll be able to sign up and save your favorites movies/series or watch their videos and images"
          />
          <meta
            name="og:url"
            property="og:url"
            content="https://theater-webapp.herokuapp.com/"
          />
          <meta
            name="og:image"
            property="og:image"
            content="https://theater-webapp.herokuapp.com/static/images/logo.jpg"
          />
          <meta property="og:type" content="website" />
          <link
            rel="shortcut icon"
            href="/static/images/logo.ico"
            type="image/x-icon"
          />
          <title>🎬 Theater - The best place for Movies 🎥 and Series 📺</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
