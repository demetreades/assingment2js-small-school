const sqlConnection = require('./connection').sqlConnection;
const Trainer       = require('../models/trainer').Trainer;
const Subject       = require('../models/subject').Subject;


async function readAll() {
  let sql = "SELECT * FROM all_trainers;";
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  console.log(result, '\tb\tb resultsss apo traineroo');
  return(result);
};

async function insert(trainer) {
  let sql = `INSERT INTO trainers(first_name, last_name, subjects_id, courses_id) VALUES (
            '${trainer.firstName}', '${trainer.lastName}', '${trainer.subjectsId}', '${trainer.coursesId}');`;
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

async function remove(id) {
  let sql = `DELETE FROM all_trainers WHERE id = ${id};`;
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);
  return(result);
};

async function find(id) {
  let sql = `SELECT * FROM all_trainers WHERE id = ${id};`;
  console.log('\nQuery: \t', sql);
  let result = await sqlConnection(sql);

  // console.log(result, ' Ta results tou find! <============== ');
  
  const trainer = new Trainer(result[0].id, result[0].first_name, result[0].last_name, result[0].subjectsId, result[0].coursesId);
  const subject = new Subject(result[0].details);

  console.log(trainer, ` ''''' O trainer: ${result[0].subjects_id}${result[0].details}  pou gemise! <============== `);
  return(trainer);
};

async function update(trainer) {
  let sql = `UPDATE trainers SET first_name='${trainer.firstName}', last_name='${trainer.lastName}', 
             subjects_id='${trainer.subjectsId}', courses_id='${trainer.coursesId}' WHERE id=${trainer.id};`;
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
