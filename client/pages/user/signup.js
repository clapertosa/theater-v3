import React from "react";
import Head from "next/head";
import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import Form from "../../components/Form/SignUp/Form";

const SignUp = () => {
  return (
    <>
      <Head>
        <title>🎬 Theater - Sign Up</title>
      </Head>
      <Form />
    </>
  );
};

SignUp.getInitialProps = async ctx => {
  // Check if user is already signed-in
  const { currentUser } = await checkLoggedIn(ctx.apolloClient);
  if (currentUser) redirect(ctx, "/");

  return {};
};

export default SignUp;
