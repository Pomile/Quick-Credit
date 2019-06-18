const parameters = (matches, filters, joinType) => {
  const exprFields = Object.values(matches);
  const tablenames = Object.keys(matches);
  const tableTags = tablenames.map(tablename => tablename.slice(0, 1));
  const filterFields = Object.keys(filters);
  const values = Object.values(filters);
  const tablenamesWithTags = tablenames.map(tablename => `${tablename} ${tablename.slice(0, 1)}`);
  const fieldsWithTags = exprFields.map((fields, index) => fields.map(field => `${tableTags[index]}.${field}`)).map(tagsWithF => tagsWithF.join(', ')).join(', ');

  const JOINS = tablenamesWithTags.map((tablenamesWithTag, index) => {
    if (index === 1 && joinType === 'INNER JOIN') {
      return `${joinType} ${tablenamesWithTag} 
                ON ${tableTags[index]}.${exprFields[index][0]} =${tableTags[0]}.${exprFields[0][0]}`;
    }
    if (index === 2 && joinType === 'INNER JOIN') {
      return `${joinType} ${tablenamesWithTag} 
                  ON ${tableTags[index]}.${exprFields[index][0]} =${tableTags[0]}.${exprFields[0][1]}`;
    }
    if (index !== 0) {
      return `${joinType} ${tablenamesWithTag} 
              ON ${tableTags[0]}.${exprFields[0][0]} = ${tableTags[index]}.${exprFields[index][0]}`;
    }
  });
  const nodPgVars = filterFields.map((field, i) => `${field}=$${1 + i}`);
  return {
    tablenames, tableTags, filterFields, values, fieldsWithTags, JOINS, nodPgVars, tablenamesWithTags,
  };
};

export default parameters;
