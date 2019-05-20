import db from '../../models/index';

const { pool } = db;

const readRecs = async (table, vals) => {
  const fields = Object.keys(vals);
  const values = Object.values(vals);
  const expr = fields.map((field, i) => `${field}=$${(i + 1)}`);
  const client = await pool.connect();
  const queryText = {
    text: `SELECT * FROM ${table} WHERE ${expr[0]} AND ${expr[1]}`,
    values,
  };

  try {
    const data = await client.query(queryText);
    return { exist: true, data: data.rows };
  } catch (err) {
    return { error: err.message };
  } finally {
    await client.release();
  }
};

export default readRecs;
