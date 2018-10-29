exports.up = function(knex, Promise) {
  return knex.schema
    .alterTable("favorites", table => {
      table
        .timestamp("created_at")
        .defaultTo(knex.fn.now())
        .alter();
    })
    .alterTable("likes", table => {
      table
        .timestamp("created_at")
        .defaultTo(knex.fn.now())
        .alter();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable("favorites", table => {
      table.timestamp("created_at").alter();
    })
    .alterTable("likes", table => {
      table.timestamp("created_at").alter();
    });
};
