// require('events').EventEmitter.prototype._maxListeners = 25;

const SQL_DATA = require('./data').SQL_DATA;
const con = require('./db.js').db;
// const sqlConnection = require('../services/connection').sqlConnection; // apo edw...

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of

// for await (variable of iterable) {
  // statement
// }


console.log
(`\n------------------- Initializing -------------------
----------------------------------------------------\n`);

databaseInit(SQL_DATA.schema);
databaseInit(SQL_DATA.tables);
databaseInit(SQL_DATA.views);
databaseInit(SQL_DATA.inserts);

function databaseInit(array) {
  let text = '';
  con.connect((err) => {
    if (err) throw err;
    else {
      array.forEach((query, index) => {
        con.query(query, function(err) {
          if (err) throw err;
          if (array === SQL_DATA.schema) text = 'SQL_DATA.schema';
          if (array === SQL_DATA.tables) text = 'SQL_DATA.tables';
          if (array === SQL_DATA.views) text = 'SQL_DATA.views';
          if (array === SQL_DATA.inserts) text = 'SQL_DATA.inserts';
          console.log(`.${index + 1}\t. ${text} \t- \tSuccessful!! `);
        });
      });
    }
  });
};
