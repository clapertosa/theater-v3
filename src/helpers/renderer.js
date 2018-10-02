import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import serialize from "javascript-serialize";
import routes from "../client/routes";
import Layout from "../client/hoc/Layout/Layout";

const renderer = (path, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={path} context={{}}>
        <Layout>{renderRoutes(routes)}</Layout>
      </StaticRouter>
    </Provider>
  );

  return `
  <!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <div id="root">${content}</div>
      <script>window.INITIAL_STATE = ${serialize(store.getState())}</script>
      <script src="bundle.js"></script>
    </body>
  </html>
  `;
};

export default renderer;
