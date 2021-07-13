const sqlConnection = require('../database/connection').sqlConnection;

async function readAll() {
  let sql = "SELECT courses.id, courses.description  FROM small_school.courses;";
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

module.exports = { readAll };
