//RIMUOVI UPDATED_AT E AGGIUNGI MEDIA TITLE MEDIA POSTER
exports.up = function(knex, Promise) {
  return knex.schema
    .alterTable("favorites", table => {
      table.dropColumn("updated_at");
      table
        .string("media_title")
        .notNullable()
        .defaultTo("No Title");
      table.string("media_poster_path");
    })
    .alterTable("likes", table => {
      table.dropColumn("updated_at");
      table
        .string("media_title")
        .notNullable()
        .defaultTo("No Title");
      table.string("media_poster_path");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable("favorites", table => {
      table.timestamp("updated_at");
      table.dropColumn("media_title");
      table.dropColumn("media_poster_path");
    })
    .alterTable("likes", table => {
      table.timestamp("updated_at");
      table.dropColumn("media_title");
      table.dropColumn("media_poster_path");
    });
};
