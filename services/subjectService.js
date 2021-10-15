const sqlConnection = require('../database/connection');

async function readAll() {
  const sql =
    'SELECT subjects.id, subjects.details FROM small_school.subjects;';
  console.log('\nQuery: \t', sql);
  const result = await sqlConnection(sql);
  return result;
}

module.exports = { readAll };
