import db from '../../models/index';

const { pool } = db;

const read = async (table, field, value, order, count) => {
  const client = await pool.connect();
  const queryText = {
    text: `SELECT * FROM ${table} WHERE ${field} = $1 ORDER BY ${order} LIMIT ${count}`,
    values: [value],
  };

  try {
    const data = await client.query(queryText);
    if (data.rows.length === 0) {
      return { exist: false, data: null };
    }
    return { exist: true, data: data.rows[0], allData: data.rows };
  } catch (err) {
    return { error: err.message };
  } finally {
    await client.release();
  }
};

export default read;
