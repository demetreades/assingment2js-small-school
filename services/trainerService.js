const sqlConnection = require('../database/connection');
const Trainer = require('../models/trainer');

function newTrainer(req) {
  const result = new Trainer(
    req.body.id,
    req.body.first_name,
    req.body.last_name,
    req.body.subjects,
    req.body.courses
  );

  return result;
}

async function view() {
  const sql = 'SELECT * FROM small_school.all_trainers;';
  console.log('\nQuery: \t', sql);

  const result = await sqlConnection(sql);

  return result;
}

async function readAll() {
  const sql = 'SELECT * FROM small_school.trainers;';
  console.log('\nQuery: \t', sql);

  const result = await sqlConnection(sql);

  return result;
}

async function insert(trainer) {
  const sql = `INSERT INTO small_school.trainers(first_name, last_name, subjects_id, courses_id) 
    VALUES 
    (
      '${trainer.firstName}',
      '${trainer.lastName}',
      '${trainer.subjectsId}',
      '${trainer.coursesId}'
    );`;
  console.log(
    `\nQuery: \tINSERT INTO small_school.trainers(${trainer.firstName}, ${trainer.lastName}, ${trainer.subjectsId}, ${trainer.coursesId})`
  );
  const result = await sqlConnection(sql);

  return result;
}

async function remove(id) {
  const sql = `DELETE FROM small_school.trainers WHERE id = ${id};`;
  console.log('\nQuery: \t', sql);
  const result = await sqlConnection(sql);

  return result;
}

async function find(id) {
  const sql = `SELECT * FROM small_school.trainers WHERE id = ${id};`;
  console.log('\nQuery: \t', sql);
  const result = await sqlConnection(sql);
  const trainer = new Trainer(
    result[0].id,
    result[0].first_name,
    result[0].last_name,
    result[0].subjects_id,
    result[0].courses_id
  );

  return trainer;
}

async function update(trainer) {
  const sql = `UPDATE small_school.trainers SET 
  first_name='${trainer.firstName}',
  last_name='${trainer.lastName}', 
  subjects_id='${trainer.subjectsId}',
  courses_id='${trainer.coursesId}'
  WHERE id=${trainer.id};`;
  console.log('\nQuery: \t', sql);
  const result = await sqlConnection(sql);

  return result;
}

module.exports = {
  newTrainer,
  view,
  readAll,
  insert,
  remove,
  update,
  find,
};
