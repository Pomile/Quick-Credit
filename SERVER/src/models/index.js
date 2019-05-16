import debug from 'debug';
import { Pool } from 'pg';
import userDef from './user';
import loanDef from './loan';
import repaymentDef from './repayment';
import jobDef from './job';
import addressDef from './address';
import Model from './model';
import configs from '../config/config.json';


const db = {};

const env = process.env.NODE_ENV;
const config = configs[env];

let pool;

if (config.use_env_variable) {
  pool = new Pool({ connectionString: process.env[config.use_env_variable] });
} else {
  pool = new Pool({
    database: config.database,
    user: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
  });
}

const createTables = async () => {
  try {
    await new Model('Users').createTable(userDef);
    await new Model('Loans').createTable(loanDef);
    await new Model('Addresses').createTable(addressDef);
    await new Model('Jobs').createTable(jobDef);
    await new Model('Repayments').createTable(repaymentDef);
  } catch (err) {
    debug.log(err);
  }
};

const dropTables = async () => {
  try {
    await new Model('Addresses').dropTable();
    await new Model('Jobs').dropTable();
    await new Model('Repayments').dropTable();
    await new Model('Loans').dropTable();
    await new Model('Users').dropTable();
  } catch (err) {
    debug.log(err.message);
  }
};

db.models = {
  sync: async (options) => {
    if (options.force === false) {
      await createTables();
      debug.log('done');
    } else {
      await dropTables();
      await createTables();
      debug.log('done');
    }
  },
};

db.pool = pool;

export default db;
