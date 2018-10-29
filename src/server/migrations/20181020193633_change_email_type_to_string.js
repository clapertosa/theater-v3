exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users", function(table) {
    table.string("email").alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("users", function(table) {
    table.text("email").alter();
  });
};
