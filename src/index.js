import express from "express";
import renderer from "./helpers/renderer";
import { matchRoutes } from "react-router-config";
import routes from "./client/routes";
import createStore from "./helpers/createStore";
const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore();

  const promises = matchRoutes(routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    .map(promise => {
      if (promise)
        new Promise((resolve, reject) => {
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

app.listen(3000, () => console.log("Server started"));
