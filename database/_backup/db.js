const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1212",
  // database: "small_school",
});

module.exports = { db };
