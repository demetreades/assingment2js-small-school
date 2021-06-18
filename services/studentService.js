var db = require("mysql2")
var dbhost_ra1 = {
    host: "ra1.anystream.eu",
    port: "5420",
    user: "cb12ptjs",
    password: "cb12ptjs",
    database: "cb12ptjs"
};
var Student = require('../models/student').Student

async function getAllStudents() {
    var sql = "SELECT * FROM `cb12ptjs`.`students`;";
    var con = db.createConnection(dbhost_ra1);
    let promise = new Promise((resolve, reject) => {
        con.connect(function (err) {
            let data;
            if(err) {
                console.log("Error Connecting");
            } else {
                console.log("Yeap, this is MySQL Server talking! At your Services!");
                con.query(sql, function(ee, result, fields) {
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
                con.query(sql, function(ee, result, fields) {
                    // console.log("Error inside con.query")
                    // console.log(ee)
                    // console.log("Error inside con.query")
                    if(ee != undefined && ee.errno > 0) reject(ee) //throw err;
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
                con.query(sql, function(ee, result, fields) {
                    // console.log("Error inside con.query")
                    // console.log(ee)
                    // console.log("Error inside con.query")
                    if(ee != undefined && ee.errno > 0) reject(ee) //throw err;
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
    var sql = `SELECT * FROM students WHERE id = ${id};` // SELECT * FROM studets WHERE id = 95
    console.log(sql)    
    var con = db.createConnection(dbhost_ra1);
    let promise = new Promise((resolve, reject) => {
        con.connect(function (err) {
            let data;
            if(err) {
                console.log("Error Connecting");
            } else {
                console.log("Yeap, this is MySQL Server talking! At your Services!");
                con.query(sql, function(ee, result, fields) {
                    // console.log("Error inside con.query")
                    // console.log(ee)
                    // console.log("Error inside con.query")
                    if(ee != undefined && ee.errno > 0) reject(ee) //throw err;
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

    /*
        [TextRow {
            id: 5,
            student_first: 'Nektarios',
            student_last: 'Banousi',
            hobby: 'Motorbikes'
            }] <----- result[0].id
    */
    let student = new Student(result[0].id, result[0].student_first, result[0].student_last, result[0].hobby)
    return(student)
}

async function updateStudent(student) {
    var sql = `UPDATE students SET student_first='${student.student_first}', student_last='${student.student_last}', hobby='${student.hobby}' WHERE id=${student.id};`
    console.log(sql)    
    var con = db.createConnection(dbhost_ra1);
    let promise = new Promise((resolve, reject) => {
        con.connect(function (err) {
            let data;
            if(err) {
                console.log("Error Connecting");
            } else {
                console.log("Yeap, this is MySQL Server talking! At your Services!");
                con.query(sql, function(ee, result, fields) {
                    // console.log("Error inside con.query")
                    // console.log(ee)
                    // console.log("Error inside con.query")
                    if(ee != undefined && ee.errno > 0) reject(ee) //throw err;
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

module.exports = { getAllStudents, insertStudent, deleteStudent, updateStudent, findStudentById }
