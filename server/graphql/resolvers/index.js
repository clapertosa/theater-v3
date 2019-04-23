const searchResolver = require("./search");
const homeResolver = require("./home");
const discoverResolver = require("./discover");
const singleMediaResolver = require("./singleMedia");
const userResolver = require("./user");

module.exports = {
  ...searchResolver,
  ...homeResolver,
  ...discoverResolver,
  ...singleMediaResolver,
  ...userResolver
};
