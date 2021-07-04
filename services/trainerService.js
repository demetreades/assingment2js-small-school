const sqlConnection = require('./connection').sqlConnection;
const Trainer = require('../models/trainer').Trainer;


async function view() {
  let sql = "SELECT * FROM small_school.all_trainers;";
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

async function readAll() {
  let sql = "SELECT * FROM small_school.trainers;";
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

async function insert(trainer) {

  console.log(trainer.toConsoleString());

  let sql = `INSERT INTO small_school.trainers(first_name, last_name, subjects_id, courses_id) VALUES (
            '${trainer.firstName}', '${trainer.lastName}', '${trainer.subjectsId}', '${trainer.coursesId}');`;
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

async function remove(id) {
  let sql = `DELETE FROM small_school.trainers WHERE id = ${id};`;
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

async function find(id) {
  let sql = `SELECT * FROM small_school.trainers WHERE id = ${id};`;
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  const trainer = new Trainer(result[0].id, result[0].first_name, result[0].last_name, result[0].subjects_id, result[0].courses_id);
  return(trainer);
};

async function update(trainer) {
  let sql = `UPDATE small_school.trainers SET first_name='${trainer.firstName}', last_name='${trainer.lastName}', 
             subjects_id='${trainer.subjectsId}', courses_id='${trainer.coursesId}' WHERE id=${trainer.id};`;
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

module.exports = {
  view, 
  readAll, 
  insert, 
  remove, 
  update, 
  find
};
