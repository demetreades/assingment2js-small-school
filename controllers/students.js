const express = require('express');
const router  = express.Router();

const studentService = require('../services/studentService');

const Student = require('../models/student').Student;


router.get('/', (req, res) => {
  studentService.readAll().then((result) => {
    res.render('students/summary', { title: 'Students summary', studentsArray: {data: result} });
  });
});

router.get('/new', (req, res) => {
  res.render('students/new', { title: 'Student insert' });
});

router.get('/delete/:id', (req, res) => {
  studentService.remove(req.params.id).then((result) => {
    if(result.affectedRows == 1) {
        res.redirect('/students');
    } else {
      res.render('error');
    }
  });
});

router.get('/update/:id', (req, res) => {
  studentService.find(req.params.id).then((result) => {
    if(result.id  == req.params.id) {
      res.render('./students/edit', { title: 'Student update', result });
    }
  });
});

router.post('/update', (req, res) => {
  const student = new Student(req.body.id, req.body.first_name, req.body.last_name, req.body.tuition_fees, req.body.date_of_birth);
  studentService.update(student).then((result) => {
    if(result.affectedRows == 1) {
      studentService.readAll().then((result) => {
        res.render('students/summary', { title: 'Students summary', studentsArray: {data: result} });
      });
    }
  });
});

router.post('/', (req, res) => {
  const student = new Student(req.body.id, req.body.first_name, req.body.last_name, req.body.tuition_fees, req.body.date_of_birth);
  studentService.insert(student).then((result) => {
    if(result.affectedRows == 1) {
      studentService.readAll().then((result) => {
        res.render('students/summary', { title: 'Students', studentsArray: {data: result} });
      });
    } else {
      res.render('/students/new');
    }
  });
});

module.exports = router;
