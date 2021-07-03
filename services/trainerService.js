const sqlConnection = require('./connection').sqlConnection;

const Trainer    = require('../models/trainer').Trainer;


async function readAll() {
  let sql = "SELECT * FROM all_trainers;";
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

async function insert(trainer) {
  let sql = `INSERT INTO trainers(first_name, last_name, courses_id, subjects_id) VALUES (
            '${trainer.firstName}', '${trainer.lastName}', '${trainer.coursesId}', '${trainer.subjectsId}');`;
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

async function remove(id) {
  let sql = `DELETE FROM trainers WHERE id = ${id};`;
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

async function find(id) {
  let sql = `SELECT * FROM trainers WHERE id = ${id};`;
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);

  const trainer = new Trainer(result[0].id, result[0].first_name, result[0].last_name, result[0].courcesId, result[0].subjectsId);
  return(trainer);
};

async function update(trainer) {
  let sql = `UPDATE trainers SET first_name='${trainer.firstName}', last_name='${trainer.lastName}', 
            tuition_fees='${trainer.courcesId}', date_of_birth='${trainer.subjectsId}' WHERE id=${trainer.id};`;
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
