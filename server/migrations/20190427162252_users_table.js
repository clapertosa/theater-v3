exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.increments("id");
    t.string("username", 16)
      .unique()
      .notNullable();
    t.string("email")
      .unique()
      .notNullable();
    t.string("password").notNullable();
    t.string("avatar");
    t.boolean("activated")
      .notNullable()
      .defaultTo(false);
    t.string("refresh_token");
    t.timestamp("refresh_token_expiration");
    t.string("reset_password_token");
    t.timestamp("reset_password_token_expiration");
    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
