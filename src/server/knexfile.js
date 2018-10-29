module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "theater",
      user: "postgres",
      password: "password"
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
