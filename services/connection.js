const mysql = require("mysql2");

   
const credentials = {
  // host: "YourHost",
  // user: "YourUser",
  // password: "YourPass",
  // port: "YourPort",
};
   

async function sqlConnection(sql) {
  const con = mysql.createConnection(credentials);
  return await new Promise((resolve, reject) => {
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
      };
    });
  });
};

module.exports = { sqlConnection };

