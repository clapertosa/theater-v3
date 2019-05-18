import React from "react";
import Message from "../components/Message/Message";

const Error = () => {
  if (process.browser) {
    setTimeout(() => (window.location.href = "/"), 2500);
  }

  return (
    <Message>
      Page not found! 😳 <br />
      You will now be redirected to the Homepage
    </Message>
  );
};

export default Error;
