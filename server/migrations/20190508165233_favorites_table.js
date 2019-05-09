exports.up = function(knex, Promise) {
  return knex.schema.createTable("favorites", t => {
    t.increments("id");
    t.integer("user_id")
      .unsigned()
      .notNullable();
    t.bigInteger("media_id").notNullable();
    t.string("media_type").notNullable();
    t.string("title").notNullable();
    t.string("poster_path");
    t.timestamps(true, true);

    t.foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("favorites");
};
