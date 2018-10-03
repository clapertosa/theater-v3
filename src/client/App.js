import React from "react";
import { Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";

const App = ({ route }) => {
  return (
    <div>
      <header>Header</header>
      <main>
        <Switch>{renderRoutes(route.routes)}</Switch>
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default {
  component: App
};
