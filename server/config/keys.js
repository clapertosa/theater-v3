if (process.env.NODE_ENV === "development") {
  module.exports = require("./dev");
} else if (process.env.NODE_ENV === "test") {
  module.exports = require("./testKeys");
} else {
  module.exports = require("./prod");
}
