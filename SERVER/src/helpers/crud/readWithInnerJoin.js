import debug from 'debug';
import db from '../../models/index';

const { pool } = db;

const parameters = (matches, filters) => {
  const exprFields = Object.values(matches);
  const tablenames = Object.keys(matches);
  const tableTags = tablenames.map(tablename => tablename.slice(0, 1));
  const filterFields = Object.keys(filters);
  const values = Object.values(filters);
  const tablenamesWithTags = tablenames.map(tablename => `${tablename} ${tablename.slice(0, 1)}`);
  const fieldsWithTags = exprFields.map((fields, index) => fields.map(field => `${tableTags[index]}.${field}`)).map(tagsWithF => tagsWithF.join(', ')).join(', ');

  const JOINS = tablenamesWithTags.map((tablenamesWithTag, index) => {
    if (index === 1) {
      return `INNER JOIN ${tablenamesWithTag} 
              ON ${tableTags[index]}.${exprFields[index][0]} =${tableTags[0]}.${exprFields[0][0]}`;
    }
    if (index === 2) {
      return `INNER JOIN ${tablenamesWithTag} 
                ON ${tableTags[index]}.${exprFields[index][0]} =${tableTags[0]}.${exprFields[0][1]}`;
    }
    return '';
  });
  const nodPgVars = filterFields.map((field, i) => `${field}=$${1 + i}`);
  return {
    tablenames, tableTags, filterFields, values, fieldsWithTags, JOINS, nodPgVars, tablenamesWithTags,
  };
};

const readWithInnerJoin = async (matches, filters) => {
  const params = parameters(matches, filters);
  const {
    tableTags, values, fieldsWithTags, JOINS, nodPgVars, tablenamesWithTags,
  } = params;
  const client = await pool.connect();
  const condition = nodPgVars.length === 2 ? (`${tableTags[0]}.${nodPgVars[0]} AND ${tableTags[2]}.${nodPgVars[1]} `) : `${tableTags[0]}.${nodPgVars[0]}`;
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
