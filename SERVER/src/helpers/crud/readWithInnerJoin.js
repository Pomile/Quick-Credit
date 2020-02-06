import debug from 'debug';
import db from '../../models/index';
import parameters from './readParams/param';

const { pool } = db;

const readWithInnerJoin = async (matches, filters) => {
  const params = parameters(matches, filters, 'INNER JOIN');
  const {
    tableTags, values, fieldsWithTags, JOINS, nodPgVars, tablenamesWithTags,
  } = params;
  const client = await pool.connect();
  const condition = nodPgVars.length === 2 ? (`${tableTags[0]}.${nodPgVars[0]} AND ${tableTags[1]}.${nodPgVars[1]}`) : `${tableTags[0]}.${nodPgVars[0]}`;
  const queryText = {
    text: `SELECT ${fieldsWithTags}
        FROM ${tablenamesWithTags[0]} 
        ${JOINS.filter(join => join !== '').join(' ')}
        WHERE ${condition};`,
    values,
  };

  try {
    const data = await client.query(queryText);
    return { success: true, data: data.rows };
  } catch (err) {
    return { success: false, data: null, msg: err.message };
  } finally {
    client.release();
  }
};

export default readWithInnerJoin;
