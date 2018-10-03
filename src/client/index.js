import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./store/reducers";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./routes";

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk)
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
