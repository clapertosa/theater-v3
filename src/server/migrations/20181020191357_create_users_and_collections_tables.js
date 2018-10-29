exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", function(table) {
      table.increments();
      table.string("name");
      table.string("surname");
      table
        .text("email")
        .unique()
        .notNullable();
      table.string("password").notNullable();
      table
        .boolean("activated")
        .notNullable()
        .defaultTo(false);
      table.binary("avatar");
      table.timestamps();
    })
    .createTable("favorites", function(table) {
      table.increments();
      table
        .integer("user_id")
        .references("id")
        .inTable("users")
        .notNullable();
      table.string("media_type").notNullable();
      table.integer("media_id").notNullable();
      table.timestamps();
    })
    .createTable("likes", function(table) {
      table.increments();
      table
        .integer("user_id")
        .references("id")
        .inTable("users")
        .notNullable();
      table.string("media_type").notNullable();
      table.integer("media_id").notNullable();
      table.timestamps();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("favorites")
    .dropTable("likes")
    .dropTable("users");
};
