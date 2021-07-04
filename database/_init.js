const SQL_DATA = require('./data').SQL_DATA;
const sqlConnection = require('../services/connection').sqlConnection;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of

console.log
(`\n------------------- Initializing -------------------
----------------------------------------------------\n`);

databaseInit(SQL_DATA.schema);
databaseInit(SQL_DATA.tables);
databaseInit(SQL_DATA.views);
databaseInit(SQL_DATA.inserts);


async function databaseInit(array) {

  for await (queries of array) {
    let result = await sqlConnection(queries);
    console.log('\n\tsuccess db query init!!!!\n');
    return(result);
  }

};
  

