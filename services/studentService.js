var db = require("mysql2")
var dbhost_ra1 = {
    host: "ra1.anystream.eu",
    port: "5420",
    user: "cb12ptjs",
    password: "cb12ptjs",
    database: "cb12ptjs"
};

// const dbcon = require('./db');

async function getAllStudents() {
    var sql = "SELECT * FROM `cb12ptjs`.`students`;";
    var con = db.createConnection(dbhost_ra1); // kanei to connection me ta credentials apo epanw
    let promise = new Promise((resolve, reject) => { // ftiaxnei to neo promise
        con.connect(function (err) { // ksekinaei to connection
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
    }); // define the Promise with any async code
  
    let result = await promise; // define that some output will be returned when the Promise is resolved
    return(result)
}

async function insertStudent(student) {
    var sql = `INSERT INTO students(student_first, student_last, hobby) 
               VALUES('${student.student_first}', '${student.student_last}', '${student.hobby}');`
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

}

async function deleteStudent(id) {
    var sql = `DELETE FROM students WHERE id = ${id};`
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
}

async function findStudentById(id) {
    var sql = `SELECT FROM students WHERE id = ${id};`
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
}

async function updateStudent(student) {
    var sql = `UPDATE students SET student_first = '${student.student_first}', student_last= '${student.student_last}}' WHERE id = ${student.id};`
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
}


// insertStudent(student) student = new Student()

module.exports = { getAllStudents, insertStudent, deleteStudent, findStudentById, updateStudent }
