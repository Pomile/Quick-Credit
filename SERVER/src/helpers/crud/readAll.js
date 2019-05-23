import db from '../../models/index';

const { pool } = db;

const readAll = async (table) => {
  const client = await pool.connect();
  const queryText = `SELECT * FROM ${table};`;
  try {
    const data = await client.query(queryText);
    return { success: true, data: data.rows };
  } catch (err) {
    return { error: err.message };
  } finally {
    await client.release();
  }
};

export default readAll;
