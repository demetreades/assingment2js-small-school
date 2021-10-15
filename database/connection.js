const mysql = require('mysql2');

const credentials = require('./credentials');

module.exports = async (sql) => {
  const con = mysql.createConnection(credentials);
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    con.connect((err) => {
      if (err) {
        console.log('\nERROR : Connecting to database\n\n', err);
      } else {
        con.query(sql, (errCon, result) => {
          if (err) {
            console.log('MySQL CONNECTION ERROR: ', err);
            throw err;
          }
          resolve(result);
        });
        con.end((err) => {
          if (err) {
            console.log('MySQL CONNECTION-END ERROR: ', err);
            throw err;
          }
          console.log('\tMySQL Disconnection');
        });
      }
    });
  });
};
