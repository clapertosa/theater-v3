import React from "react";

const NotFound = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <div>Page not found</div>;
};

export default {
  component: NotFound
};
