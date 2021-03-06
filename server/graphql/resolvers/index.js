const searchResolver = require("./search");
const homeResolver = require("./home");
const discoverResolver = require("./discover");
const singleMediaResolver = require("./singleMedia");
const mediaListResolver = require("./mediaList");
const personResolver = require("./person");
const authResolver = require("./auth");
const userResolver = require("./user");

module.exports = {
  ...searchResolver,
  ...homeResolver,
  ...discoverResolver,
  ...singleMediaResolver,
  ...mediaListResolver,
  ...personResolver,
  ...authResolver,
  ...userResolver
};
