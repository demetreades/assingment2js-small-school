const sqlConnection = require('./connection').sqlConnection;

async function readAll() {
  let sql = "SELECT subjects.id, subjects.details FROM small_school.subjects;";
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  console.log(result);
  return(result);
};

module.exports = { readAll };
