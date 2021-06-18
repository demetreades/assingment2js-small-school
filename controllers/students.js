var express = require('express');
var router = express.Router();
var studentService = require('../services/studentService')
var Student = require('../models/student').Student


/* GET all students */
router.get('/', function(req, res, next) {
  studentService.getAllStudents().then((result) => {
        res.render('students', { title: 'Students', studentsArray: {data: result} })
  }) 
})

/* GET a new student - has an HTML form */
// http://localhost:3000/students/new
router.get('/new', function(req, res, next) {
  res.render('newStudent', { title: 'Students' })
})


/* GET a delete action with :id */
// http://localhost:3000/students/delete/1
router.get('/delete/:id', function(req, res, next) {
  studentService.deleteStudent(req.params.id).then((result) => {
    if(result.affectedRows == 1) {
      studentService.getAllStudents().then((result) => {
        res.render('students', { title: 'Students', studentsArray: {data: result} })
      })
    } else {
      res.render('newStudent')
    }
    console.log(result)
  })
})

/* GET update student */
// http://localhost:3000/students/update/:id
router.get('/update/:id', function(req, res, next) {
  // get from the studentService the row with :id <--- findStudentById(id)
  studentService.findStudentById(req.params.id).then((result) => {
    if(result.id  == req.params.id) { // (result.id > 0)
      console.log(result)
      res.render('editStudent', { result })
    }
  })


  // when we have this Student object
  // render the page 'editStudent', aStudent
})

/* POST update student */
// http://localhost:3000/students/update
router.post('/update', function(req, res, next) {
  // 1. call updateStudent(student)
  // 2. render /students
  let student = new Student(req.body.id, req.body.fname, req.body.lname, req.body.hobby)
  studentService.updateStudent(student).then((result) => {
    if(result.affectedRows == 1) {
      studentService.getAllStudents().then((result) => {
        res.render('students', { title: 'Students', studentsArray: {data: result} })
      })
    // } else {
    //   res.render('newStudent')
    }
  })
})


/* POST a student */
router.post('/', function(req, res, next) {
  // console.log(req.body)
  let aStudent = new Student(null,req.body.fname, req.body.lname, req.body.hobby)
  // INSERT INTO db this aStudent
  studentService.insertStudent(aStudent).then((result) => {
    if(result.affectedRows == 1) {
      studentService.getAllStudents().then((result) => {
        res.render('students', { title: 'Students', studentsArray: {data: result} })
      })
    } else {
      res.render('newStudent')
    }
    console.log(result)
    
  })
})


module.exports = router;
