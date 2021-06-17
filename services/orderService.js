var db = require("mysql2");
var dbhost_ra1 = {
    host: "ra1.anystream.eu",
    port: "5420",
    user: "cb12ptjs",
    password: "cb12ptjs",
    database: "cb12ptjs"
};

// const dbcon = require('./db');

async function getAllOrders() {
    var sql = "SELECT * FROM `cb12ptjs`.`orders`;";
    var con = db.createConnection(dbhost_ra1);
    let promise = new Promise((resolve, reject) => {
        con.connect(function (err) {
            let data;
            if(err) {
                console.log("Error Connecting");
            } else {
                console.log("Yeap, this is MySQL Server talking! At your Services!");
                con.query(sql, function(err, result, fields) {
                    if(err) throw err;
                    resolve(result)
                });
                
                con.end(function(err) {
                    console.log("Disconnected from MySQL server");
                });
                return(data);
            }
            // console.log(data)
            return(-1);
        })
    });
  
    let result = await promise; 
    return(result)
};

async function insertOrder(order) {
    var sql = `INSERT INTO orders(createdAt, updatedAt, customerId) 
               VALUES('${order.createdAt}', '${order.updatedAt}', '${order.customerId}');`
    console.log(sql)    
    var con = db.createConnection(dbhost_ra1);
    let promise = new Promise((resolve, reject) => {
        con.connect(function (err) {
            let data;
            if(err) {
                console.log("Error Connecting");
            } else {
                console.log("Yeap, this is MySQL Server talking! At your Services!");
                con.query(sql, function(err, result, fields) {
                    if(err != undefined && err.errno > 0) reject(err) //throw err;
                    resolve(result)
                });
                
                con.end(function(err) {
                    console.log("Disconnected from MySQL server");
                });
                return(data);
            }
            // console.log(data)
            return(-1);
        })
    }); // define the Promise with any async code
  
    let result = await promise; // define that some output will be returned when the Promise is resolved
    return(result)

};


async function deleteOrder(id) {
    var sql = `DELETE FROM orders WHERE id = ${id};`
    console.log(sql)    
    var con = db.createConnection(dbhost_ra1);
    let promise = new Promise((resolve, reject) => {
        con.connect(function (err) {
            let data;
            if(err) {
                console.log("Error Connecting");
            } else {
                console.log("Yeap, this is MySQL Server talking! At your Services!");
                con.query(sql, function(err, result, fields) {
                    if(err != undefined && err.errno > 0) reject(err) //throw err;
                    resolve(result)
                });
                
                con.end(function(err) {
                    console.log("Disconnected from MySQL server");
                });
                return(data);
            }
            // console.log(data)
            return(-1);
        })
    }); // define the Promise with any async code
  
    let result = await promise; // define that some output will be returned when the Promise is resolved
    return(result)
};

async function editOrder(id) {
    var sql = `SELECT FROM orders WHERE id = ${id};`
    console.log(sql)    
    var con = db.createConnection(dbhost_ra1);
    let promise = new Promise((resolve, reject) => {
        con.connect(function (err) {
            let data;
            if(err) {
                console.log("Error Connecting");
            } else {
                console.log("Yeap, this is MySQL Server talking! At your Services!");
                con.query(sql, function(err, result, fields) {
                    if(err != undefined && err.errno > 0) reject(err) //throw err;
                    resolve(result)
                });
                
                con.end(function(err) {
                    console.log("Disconnected from MySQL server");
                });
                return(data);
            }
            // console.log(data)
            return(-1);
        })
    }); // define the Promise with any async code
  
    let result = await promise; // define that some output will be returned when the Promise is resolved
    return(result)

};

module.exports = 
{ 
    getAllOrders, 
    insertOrder,
    deleteOrder,
    editOrder
}
