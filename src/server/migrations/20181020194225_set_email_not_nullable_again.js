exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users", function(table) {
    table
      .string("email")
      .notNullable()
      .alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("users", function(table) {
    table.string("email").alter();
  });
};
