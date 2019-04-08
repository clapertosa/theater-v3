const searchResolver = require("./search");
const discoverResolver = require("./discover");
const userResolver = require("./user");

module.exports = { ...searchResolver, ...discoverResolver, ...userResolver };
