import express from "express";
import bodyParser from "body-parser";
import { matchRoutes } from "react-router-config";
import routes from "../client/routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
// Import API Routes
import moviesRoutes from "./routes/api/movies";
import seriesRoutes from "./routes/api/series";
import searchRoutes from "./routes/api/search";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore();

  const promises = matchRoutes(routes, req.path)
    .map(({ route }) => {
      return route.loadData
        ? route.loadData(store, req.path, req.query, req.params)
        : null;
    })
    .map(promise => {
      if (promise)
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req.path, store, context);

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.use("/api/movies", moviesRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/search", searchRoutes);
app.listen(3000, () => console.log("Server started"));
