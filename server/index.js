const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const graphqlHTTP = require("express-graphql");
const { graphqlUploadExpress } = require("graphql-upload");
const authenticate = require("./middleware/authenticate");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: "client", dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

// GraphQL imports
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const server = express();
// server.use(express.json());

// helmet and compression
server.use(helmet({ hidePoweredBy: { setTo: "Ulver" } }));
server.use(compression());

// express-graphql
server.use(
  "/graphql",
  authenticate,
  graphqlUploadExpress({ maxFileSize: 20000000, maxFiles: 1 }),
  graphqlHTTP((req, res) => ({
    schema: schema,
    rootValue: resolvers,
    context: { req, res },
    graphiql: process.env.NODE_ENV !== "production"
  }))
);

server.get("*", authenticate, (req, res) => {
  return handle(req, res);
});

module.exports = app
  .prepare()
  .then(() => server.listen(PORT))
  .catch(console.error);
