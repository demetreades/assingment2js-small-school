const mysql = require('mysql2');

const SQL_DATA = require('./data');
const credentials = require('./credentials');

const con = mysql.createConnection(credentials);

console.log(`\n------------------- Initializing -------------------
----------------------------------------------------\n`);

function databaseInit(array) {
  let text = '';
  con.connect((err) => {
    if (err) throw err;
    else {
      array.forEach((query, index) => {
        con.query(query, (err) => {
          if (err) throw err;
          if (array === SQL_DATA.schema) text = 'A: SQL_DATA.schema';
          if (array === SQL_DATA.tables) text = 'B: SQL_DATA.tables';
          if (array === SQL_DATA.views) text = 'C: SQL_DATA.views';
          if (array === SQL_DATA.inserts) text = 'D: SQL_DATA.inserts';
          console.log(`${index + 1}:${text}`);
        });
      });
    }
  });
}

databaseInit(SQL_DATA.schema);
databaseInit(SQL_DATA.tables);
databaseInit(SQL_DATA.views);
databaseInit(SQL_DATA.inserts);

setTimeout(() => {
  console.log('\nEXIT -----------------------------------------------\n');
  process.exit(1);
}, 2000);
