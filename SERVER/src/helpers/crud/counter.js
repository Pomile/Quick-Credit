import db from '../../models/index';

const { pool } = db;

const counter = async (table, condition) => {
  const client = await pool.connect();

  try {
    if (condition !== undefined) {
      const fields = Object.keys(condition);
      const values = Object.values(condition);
      const result = Promise.all(await fields.map(async (field, index) => {
        const queryText = {
          text: `SELECT COUNT(*) FROM ${table} WHERE ${field} = $1`,
          values: [values[index]],
        };
        const data = await client.query(queryText);
        return { ...data.rows[0], field, value: values[index] };
      }));
      return result;
    }
    const query = `SELECT COUNT(*) FROM ${table};`;
    const data = await client.query(query);
    return { total: data.rows[0].count };
  } catch (err) {
    return { error: err.message };
  } finally {
    await client.release();
  }
};

export default counter;
