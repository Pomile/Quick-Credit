import debug from 'debug';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import userDef from './user';
import loanDef from './loan';
import repaymentDef from './repayment';
import jobDef from './job';
import addressDef from './address';
import bankDef from './bank';
import Model from './model';

dotenv.config();

const db = {};

let pool;

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
} else if (process.env.NODE_ENV === 'development') {
  pool = new Pool({
    database: process.env.DEV_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  });
} else if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    database: process.env.TEST_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  });
}

const createTables = async () => {
  try {
    await new Model('Users').createTable(userDef);
    await new Model('Loans').createTable(loanDef);
    await new Model('Addresses').createTable(addressDef);
    await new Model('Jobs').createTable(jobDef);
    await new Model('Banks').createTable(bankDef);
    await new Model('Repayments').createTable(repaymentDef);
  } catch (err) {
    debug.log(err);
  }
};

const dropTables = async () => {
  try {
    await new Model('Addresses').dropTable();
    await new Model('Banks').dropTable();
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
