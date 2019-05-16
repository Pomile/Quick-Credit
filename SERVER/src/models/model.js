import { Pool } from 'pg';
import debug from 'debug';
import configs from '../config/config.json';

const env = process.env.NODE_ENV;
const config = configs[env];
debug.log(config);

class Model {
  constructor(table) {
    this.table = table;
    if (config.use_env_variable) {
      this.pool = new Pool({ connectionString: process.env[config.use_env_variable] });
    } else {
      this.pool = new Pool({
        database: config.database,
        user: config.username,
        password: config.password,
        host: config.host,
        port: config.port,
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
