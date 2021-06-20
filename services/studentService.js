const Student = require('../models/student').Student

const db = require("mysql2")

// let con = mysql.createConnection({
const dbhost_ra1 = {
    host: "ra1.anystream.eu",
    port: "5420",
    user: "cb12ptjs",
    password: "cb12ptjs",
    database: "cb12ptjs"
}
   
function sqlConnection(sql) {
    var con = db.createConnection(dbhost_ra1);
    let promise = new Promise((resolve, reject) => {
        con.connect(function (err) {
            if(err) {
                console.log("\n-------------------- Error Connecting! --------------------\n\n",err);
            } else {
                console.log("\n--------------------- SQL Connected ----------------------");
                con.query(sql, function(err, result, fields) {
                    if(err) throw err;
                    resolve(result);
                });
                con.end(function(err) {
                    console.log("-------------------- SQL Disconnected --------------------\n");
                });
            }
        });
    });
    let result = promise;
    console.log('sqlConnection() ===> ', result);
    return(result);
}

async function getAllStudents() {
    var sql = "SELECT * FROM `cb12ptjs`.`students`;";
    console.log('\nQuery: \t', sql)    
    let result = await sqlConnection(sql)
    return(result)
}

async function insertStudent(student) {
    var sql = `INSERT INTO students(student_first, student_last, hobby) VALUES('${student.student_first}', '${student.student_last}', '${student.hobby}');`
    console.log('\nQuery: \t', sql)    
    let result = await sqlConnection(sql)
    return(result)
}

async function deleteStudent(id) {
    var sql = `DELETE FROM students WHERE id = ${id};`
    console.log('\nQuery: \t', sql)    
    let result = await sqlConnection(sql)
    return(result)
}

async function findStudentById(id) {
    var sql = `SELECT * FROM students WHERE id = ${id};`
    console.log('\nQuery: \t', sql)    
    let result = await sqlConnection(sql)
    let student = new Student(result[0].id, result[0].student_first, result[0].student_last, result[0].hobby)
    return(student)
}

async function updateStudent(student) {
    var sql = `UPDATE students SET student_first='${student.student_first}', student_last='${student.student_last}', hobby='${student.hobby}' WHERE id=${student.id};`
    console.log('\nQuery: \t', sql)    
    let result = await sqlConnection(sql)
    return(result)
}

module.exports = { 
    getAllStudents, 
    insertStudent, 
    deleteStudent, 
    updateStudent, 
    findStudentById
}
