import React from "react";
import { Redirect } from "react-router";
import { Home, NotFound, Register, Login } from "./pages";
import { loadShowcase } from "./containers/Showcase/Showcase";
import App from "./App";

export default [
  {
    ...App,
    routes: [
      {
        component: () => <Redirect to="/movies/latest" />,
        path: "/",
        loadData: loadShowcase,
        exact: true
      },
      { ...Home, path: "/movies/latest", loadData: loadShowcase },
      { ...Home, path: "/movies/top-rated", loadData: loadShowcase },
      { ...Home, path: "/movies/most-voted", loadData: loadShowcase },
      { ...Home, path: "/series/on-the-air", loadData: loadShowcase },
      { ...Home, path: "/series/top-rated", loadData: loadShowcase },
      { ...Home, path: "/series/most-popular", loadData: loadShowcase },
      { ...Register, path: "/register" },
      { ...Login, path: "/login" },
      { ...NotFound }
    ]
  }
];
