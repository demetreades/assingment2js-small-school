const SQL_DATA = require('./data').SQL_DATA;

const mysql = require('mysql2');

// const con = mysql.createConnection({
//   host:     '127.0.0.1',
//   // user:     'enter your MySQL user here',
//   // password: 'enter your MySQL password here',
// });

const con = mysql.createConnection({
  host:     '127.0.0.1',
  user:     'root',
  password: '1212',
});

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
    };
  });
};
