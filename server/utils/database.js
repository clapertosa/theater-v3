const knex = require("../config/db");

module.exports = {
  userExists: async (username, email) => {
    const user = await knex("users")
      .first()
      .where({ email })
      .orWhere({ username });

    if (!user) {
      return false;
    } else if (user.username === username) {
      throw new Error("Username already in use");
    } else if (user.email === email) {
      throw new Error("Email already in use");
    }
  }
};
