const { sqlConnection } = require('../database/connection');

async function readAll() {
  const sql =
    'SELECT courses.id, courses.description  FROM small_school.courses;';
  console.log('\nQuery: \t', sql);
  const result = await sqlConnection(sql);
  return result;
}

module.exports = { readAll };
