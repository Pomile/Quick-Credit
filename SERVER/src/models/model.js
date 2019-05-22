import { Pool } from 'pg';
import debug from 'debug';
import dotenv from 'dotenv';
import '@babel/polyfill';

dotenv.config();

class Model {
  constructor(table) {
    this.table = table;

    if (process.env.NODE_ENV === 'production') {
      this.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
    } else if (process.env.NODE_ENV === 'development') {
      this.pool = new Pool({
        database: process.env.DEV_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
      });
    } else if (process.env.NODE_ENV === 'test') {
      this.pool = new Pool({
        database: process.env.TEST_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
      });
    }

    this.pool.on('error', (err, client) => {
      Model.logger('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  logger(message) {
    return debug.log(message);
  }

  async createTable(def) {
    const query = `CREATE TABLE IF NOT EXISTS ${this.table}(${def});`;
    this.logger(`our query is ${query}`);
    const run = await this.pool.query(query);
    return run;
  }

  async dropTable() {
    const query = `DROP TABLE IF EXISTS ${this.table};`;
    this.logger(`our query is ${query}`);
    const run = await this.pool.query(query);
    return run;
  }
}


export default Model;
