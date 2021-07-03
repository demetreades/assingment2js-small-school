const db = require("mysql2");

// TODO: na ginei module sto /lib me onoma db
const credentials = {
  host: "localhost",
  user: "root",
  password: "1212",
  database: "small_school"
};
   

function sqlConnection(sql) {
  const con = db.createConnection(credentials);
  const promise = new Promise((resolve, reject) => {
    con.connect(function (err) {
      if(err) console.log("\n-------------------- Error Connecting! --------------------\n\n",err);
      else {
        console.log("\n--------------------- SQL Connected ----------------------\n");
        con.query(sql, function(err, result) {
          if(err) throw err;
          resolve(result);
        });
        con.end(function(err) {
          if(err) throw err;
          console.log("-------------------- SQL Disconnected --------------------\n");
        });
      }
    });
  });
  const result = promise;
  return(result);
};

module.exports = { sqlConnection };

