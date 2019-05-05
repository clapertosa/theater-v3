// Update with your config settings.

module.exports = {
  test: {
    client: "postgresql",
    connection: {
      database: "theater-test",
      user: "postgres",
      password: "postgres"
    }
  },

  development: {
    client: "postgresql",
    connection: {
      database: "theater",
      user: "postgres",
      password: "postgres"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "theater",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
