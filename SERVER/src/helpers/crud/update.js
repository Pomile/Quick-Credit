import db from '../../models/index';

const { pool } = db;

const update = async (table, vals, expr) => {
  const fields = Object.keys(vals);
  const values = Object.values(vals);
  const exprVal = Object.values(expr)[0];
  const exprField = Object.keys(expr)[0];
  const nodPgVars = fields.map((field, i) => `${field}=$${1 + i}`);
  const variables = fields.length > 1 ? nodPgVars.join(', ') : nodPgVars.toString();
  const client = await pool.connect();
  const queryText = {
    text: `UPDATE ${table} SET ${variables} WHERE ${exprField}='${exprVal}' RETURNING *`,
    values,
  };
  try {
    const data = await client.query(queryText);
    return { success: true, data: data.rows[0] };
  } catch (err) {
    return { success: false, data: null, msg: err.message };
  } finally {
    client.release();
  }
};

export default update;
