const db = require("mysql2");

const credentials = {
  host: "localhost",
  user: "root",
  password: "1212",
  database: "small_school"
};
   

async function sqlConnection(sql) {
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
  const result = await promise;
  return(result);
};

module.exports = { sqlConnection };

