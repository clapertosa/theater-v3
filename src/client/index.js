import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./store/reducers";
import { BrowserRouter } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import routes from "./routes";
import { renderRoutes } from "react-router-config";

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk)
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>{renderRoutes(routes)}</Layout>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
