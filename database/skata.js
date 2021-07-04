const db = require("mysql2");

// TODO: na ginei module sto /lib me onoma db
const credentials = {
  host: "localhost",
  user: "root",
  password: "1212",
  // database: "small_school"
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

async function dropDB() {
  let sql = "DROP DATABASE IF EXISTS small_school;";
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  console.log(result); // <========================================
  return(result);
};

async function createDB() {
  let sql = "CREATE DATABASE small_school;";
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  console.log(result); // <========================================
  return(result);
};

async function useDB() {
  let sql = "USE small_school;";
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  console.log(result); // <========================================
  return(result);
};

for await(queriez of array) {
  
}
dropDB()
createDB()
useDB()
