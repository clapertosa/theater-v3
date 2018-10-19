import React from "react";
import { Redirect } from "react-router";
import { Home, Movie, Serie, NotFound, Register, Login } from "./pages";
import { loadShowcase } from "./containers/Showcase/Showcase";
import { loadMovie } from "./containers/MovieInfo/MovieInfo";
import { loadSerie } from "./containers/SerieInfo/SerieInfo";
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
      { ...Movie, path: "/movies/movie/:id", loadData: loadMovie },
      { ...Serie, path: "/series/serie/:id", loadData: loadSerie },
      { ...Register, path: "/register" },
      { ...Login, path: "/login" },
      { ...NotFound }
    ]
  }
];
