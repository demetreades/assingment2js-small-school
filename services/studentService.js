const sqlConnection = require('../database/connection');

const Student = require('../models/student');

function newStudent(req) {
  const result = new Student(
    req.body.id,
    req.body.first_name,
    req.body.last_name,
    req.body.tuition_fees,
    req.body.discount,
    req.body.date_of_birth
  );

  return result;
}

async function readAll() {
  const sql =
    "SELECT id, first_name, last_name, total, discount, DATE_FORMAT(date_of_birth, '%d-%m-%Y') AS date_of_birth  FROM students;";
  console.log('\nQuery: \t', sql);

  const result = await sqlConnection(sql);

  return result;
}

async function insert(student) {
  const sql = `INSERT INTO students(first_name, last_name, tuition_fees, discount, total, date_of_birth) 
    VALUES
    (
      '${student.firstName}',
      '${student.lastName}', 
      '${student.tuitionFees.amount}',
      '${student.tuitionFees.discount}',
      '${student.tuitionFees.total}',
      '${student.dateOfBirth}'
    );`;
  console.log(
    `\nQuery: \tINSERT INTO students(first_name, last_name, tuition_fees, discount, total, date_of_birth) VALUES(${student.firstName}, ${student.lastName}, ${student.tuitionFees.amount}, ${student.tuitionFees.discount}, ${student.tuitionFees.total}, ${student.dateOfBirth})`
  );
  const result = await sqlConnection(sql);

  return result;
}

async function remove(id) {
  const sql = `DELETE FROM students WHERE id = ${id};`;
  console.log('\nQuery: \t', sql);

  const result = await sqlConnection(sql);

  return result;
}

async function find(id) {
  const sql = `SELECT * FROM students WHERE id = ${id};`;
  console.log('\nQuery: \t', sql);

  const result = await sqlConnection(sql);

  const student = new Student(
    result[0].id,
    result[0].first_name,
    result[0].last_name,
    result[0].tuition_fees,
    result[0].discount,
    result[0].date_of_birth
  );

  return student;
}

async function update(student) {
  const sql = `UPDATE students SET 
  first_name='${student.firstName}',
  last_name='${student.lastName}', 
  tuition_fees='${student.tuitionFees.amount}',
  discount='${student.tuitionFees.discount}',
  total='${student.tuitionFees.total}',
  date_of_birth='${student.dateOfBirth}' 
  WHERE id=${student.id};`;
  console.log('\nQuery: \t', sql);

  const result = await sqlConnection(sql);

  return result;
}

module.exports = {
  newStudent,
  readAll,
  insert,
  remove,
  update,
  find,
};
