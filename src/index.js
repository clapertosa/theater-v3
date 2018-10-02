import express from "express";
import renderer from "./helpers/renderer";
import { matchRoutes } from "react-router-config";
import routes from "./client/routes";
import createStore from "./helpers/createStore";
const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore();

  const promises = matchRoutes(routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises).then(() => {
    res.send(renderer(req.path, store));
  });
});

app.listen(3000, () => console.log("Server started"));
