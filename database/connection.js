const mysql = require('mysql2');
const { credentials } = require('./credentials');

async function sqlConnection(sql) {
  const con = mysql.createConnection(credentials);
  return await new Promise((resolve, reject) => {
    con.connect((err) => {
      if (err)
        console.log(
          '\n-------------------- Error Connecting! --------------------\n\n',
          err
        );
      else {
        console.log(
          '\n--------------------- SQL Connected ----------------------\n'
        );
        con.query(sql, (err, result) => {
          if (err) throw err;
          console.log('SQL CONNECTION ERROR: ', err);
          resolve(result);
        });
        con.end((err) => {
          if (err) throw err;
          console.log('SQL CONNECTION-END ERROR: ', err);
          console.log(
            '-------------------- SQL Disconnected --------------------\n'
          );
        });
      }
    });
  });
}

module.exports = { sqlConnection };
