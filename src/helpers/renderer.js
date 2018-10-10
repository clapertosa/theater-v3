import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter, Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import serialize from "serialize-javascript";
import routes from "../client/routes";

const renderer = (path, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={path} context={context}>
        <Switch>{renderRoutes(routes)}</Switch>
      </StaticRouter>
    </Provider>
  );

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Theater - Movies and Series</title>
      <link rel="stylesheet" href="main.css" />
    </head>
    <body>
      <div id="root">${content}</div>
      <script>window.INITIAL_STATE = ${serialize(store.getState())}</script>
      <script src="bundle.js"></script>
    </body>
  </html>
  `;
};

export default renderer;
