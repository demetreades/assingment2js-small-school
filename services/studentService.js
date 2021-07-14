const sqlConnection = require('../database/connection').sqlConnection;

const Student  = require('../models/student').Student;


async function readAll() {
  let sql = "SELECT id, first_name, last_name, total, discount, DATE_FORMAT(date_of_birth, '%d-%m-%Y') AS date_of_birth  FROM students;";
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

async function insert(student) {
  let sql = 
  `INSERT INTO students(first_name, last_name, tuition_fees, discount, total, date_of_birth) 
    VALUES
    (
      '${student.firstName}',
      '${student.lastName}', 
      '${student.tuitionFees.amount}',
      '${student.tuitionFees.discount}',
      '${student.tuitionFees.total}',
      '${student.dateOfBirth}'
    );`;
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

async function remove(id) {
  let sql = `DELETE FROM students WHERE id = ${id};`;
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

async function find(id) {
  let sql = `SELECT * FROM students WHERE id = ${id};`;
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  
  let student = 
  new Student
  (
   result[0].id,
   result[0].first_name,
   result[0].last_name,
   result[0].tuition_fees,
   result[0].discount,
   result[0].date_of_birth,
  );
   console.log(   result[0].date_of_birth,
    );
  return(student);
};

async function update(student) {
  let sql = 
  `UPDATE students SET 
  first_name='${student.firstName}',
  last_name='${student.lastName}', 
  tuition_fees='${student.tuitionFees.amount}',
  discount='${student.tuitionFees.discount}',
  total='${student.tuitionFees.total}',
  date_of_birth='${student.dateOfBirth}' 
  WHERE id=${student.id};`;
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

module.exports = { 
  readAll, 
  insert, 
  remove, 
  update, 
  find
};
