import db from '../../models/index';

const { pool } = db;

const create = async (table, vals) => {
  const fields = Object.keys(vals);
  const values = Object.values(vals);
  const nodPostVar = fields.map((key, i) => (`$${i + 1}`)).join(', ');
  const client = await pool.connect();
  const query = {
    text: `INSERT INTO ${table} (${fields.join(', ')} ) VALUES(${nodPostVar}) RETURNING *`,
    values,
  };
  try {
    const data = await client.query(query);
    return { sucess: true, data: data.rows[0] };
  } catch (err) {
    return {
      success: false, data: null, error: err.message,
    };
  } finally {
    await client.release();
  }
};

export default create;
