const express = require('express');
const router  = express.Router();

const studentService = require('../services/studentService');

const Student = require('../models/student').Student;


router.get('/', function(req, res) {
  studentService.readAll().then((result) => {
    res.render('students/summary', { title: 'Students summary', studentsArray: {data: result} });
  });
});

router.get('/new', function(req, res) {
  res.render('students/new', { title: 'Student insert' });
});

router.get('/delete/:id', function(req, res) {
  studentService.remove(req.params.id).then((result) => {
    if(result.affectedRows == 1) {
      studentService.readAll().then((result) => {
        res.render('students/summary', { title: 'Students summary', studentsArray: {data: result} })
      });
    } else {
      res.render('/students/summary',{ title: 'Students summary'});
    }
  });
});

router.get('/update/:id', function(req, res) {
  studentService.find(req.params.id).then((result) => {
    if(result.id  == req.params.id) {
      res.render('./students/edit', { title: 'Student update', result });
    }
  });
});

router.post('/update', function(req, res) {
  const student = new Student(req.body.id, req.body.first_name, req.body.last_name, req.body.tuition_fees, req.body.date_of_birth);
  studentService.update(student).then((result) => {
    if(result.affectedRows == 1) {
      studentService.readAll().then((result) => {
        res.render('students/summary', { title: 'Students summary', studentsArray: {data: result} });
      });
    }
  });
});

router.post('/', function(req, res) {
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
