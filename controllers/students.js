/* eslint-disable eqeqeq */

const express = require('express');

const studentService = require('../services/studentService');
const DateUtil = require('../models/utilities/dateutil');

const router = express.Router();

router.get('/', (req, res) => {
  studentService.readAll().then((result) => {
    res.render('students/summary', {
      title: 'Students summary',
      studentsArray: { data: result },
    });
  });
});

router.get('/new', (req, res) => {
  const dateUtil = new DateUtil();

  res.render('students/new', { title: 'Student insert', dateUtil });
});

router.get('/delete/:id', (req, res) => {
  studentService.remove(req.params.id).then((result) => {
    if (result.affectedRows == 1) {
      res.redirect('/students');
    } else {
      res.render('/error');
    }
  });
});

router.get('/update/:id', (req, res) => {
  studentService.find(req.params.id).then((result) => {
    if (result.id == req.params.id) {
      res.render('./students/edit', { title: 'Student update', result });
    }
  });
});

router.post('/update', (req, res) => {
  const student = studentService.newStudent(req);

  console.log('/update', student.toConsoleString());
  studentService.update(student).then((result) => {
    if (result.affectedRows == 1) {
      res.redirect('/students');
    }
  });
});

router.post('/', (req, res) => {
  const student = studentService.newStudent(req);

  studentService.insert(student).then((result) => {
    if (result.affectedRows == 1) {
      res.redirect('/students');
    } else {
      res.render('/students/new');
    }
  });
});

module.exports = router;
