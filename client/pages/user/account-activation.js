import React from "react";
import { ACTIVATE_ACCOUNT_MUTATION } from "../../apollo/mutations";
import Message from "../../components/Message/Message";

const AccountActivation = ({ message }) => {
  if (process.browser) {
    setTimeout(() => {
      window.location.href = "/user/signin";
    }, 3000);
  }
  return <Message>{message}</Message>;
};

AccountActivation.getInitialProps = async ({ query, apolloClient }) => {
  let message;
  try {
    const res = await apolloClient.mutate({
      mutation: ACTIVATE_ACCOUNT_MUTATION,
      variables: {
        token: query.token
      }
    });
    message = res.data.activateAccount;
  } catch (e) {
    if (query.token) {
      message = e.graphQLErrors[0].message;
    } else {
      message = "Invalid or expired token";
    }
  }
  return { message };
};

export default AccountActivation;
