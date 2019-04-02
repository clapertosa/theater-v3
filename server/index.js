const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const graphqlHTTP = require("express-graphql");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: "client", dev });
const handle = app.getRequestHandler();

// GraphQL imports
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

app.prepare().then(() => {
  const server = express();
  // server.use(express.json());

  // helmet and compression
  server.use(helmet({ hidePoweredBy: { setTo: "Ulver" } }));
  server.use(compression());

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  // express-graphql
  server.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: resolvers,
      graphiql: process.env.NODE_ENV === "production" ? false : true
    })
  );

  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
