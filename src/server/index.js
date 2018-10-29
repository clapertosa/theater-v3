import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import { matchRoutes } from "react-router-config";
import routes from "../client/routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
import passport from "./config/passport";
import redis from "redis";
import keys from "./config/keys";
// Import API Routes
import moviesRoutes from "./routes/api/movies";
import seriesRoutes from "./routes/api/series";
import searchRoutes from "./routes/api/search";
import userRoutes from "./routes/api/user";
import dashboardRoutes from "./routes/api/dashboard";

const client = redis.createClient(process.env.REDIS_URL);
const redisStore = require("connect-redis")(session);
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

// EXPRESS-SESSION MIDDLEWARE
app.use(
  session({
    store:
      process.env.NODE_ENV === "production"
        ? new redisStore({
            url: process.env.REDIS_URL
          })
        : new redisStore({
            host: "localhost",
            port: 6379,
            client: client
          }),
    name: "sessionID",
    secret: keys.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production" ? true : false
    }
  })
);

client.on("error", function(err) {
  console.log("could not establish a connection with redis. " + err);
});
client.on("connect", function(err) {
  console.log("connected to redis successfully");
});

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

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
app.use("/api/user", userRoutes);
app.use("/api/user/dashboard", dashboardRoutes);
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server started as ${process.env.NODE_ENV}`)
);
