const mysql = require("mysql2");

const credentials = {
  host: "127.0.0.1",
  user: "root",
  password: "1212",
  // port: "YourPort",
  database: "small_school"
};
   
// const credentials = {
//   // host: "YourHost",
//   // user: "YourUser",
//   // password: "YourPass",
//   // port: "YourPort",
//   database: "small_school"
// };
   

async function sqlConnection(sql) {
  const con = mysql.createConnection(credentials);
  const promise = new Promise((resolve, reject) => {
    con.connect( (err) => {
      if(err) console.log("\n-------------------- Error Connecting! --------------------\n\n",err);
      else {
        console.log("\n--------------------- SQL Connected ----------------------\n");
        con.query(sql, (err, result) => {
          if(err) throw err;
          resolve(result);
        });
        con.end((err) => {
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

