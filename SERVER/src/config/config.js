const configs = {
  development: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: 'postgres',
  },

  test: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: 'postgres',
  },
  production: {
    client: 'pg',
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
};

export default configs;
