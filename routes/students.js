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
  res.render('newStudent', { title: 'Insert Students' })
})


/* GET a delete action with :id */
// http://localhost:3000/students/delete/1
router.get('/delete/:id', function(req, res, next) {
  studentService.selectById(req.params.id, 'DELETE', 'students').then((result) => {
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
  // studentService.selectById(req.params.id, 'students', 'SELECT').then((result) => {
  
  // }) 
  res.render('editStudent', { title: 'Update Students' })
  // edw twra ti????
})
  // get from the studentService the row with :id <--- findStudentById(id)
  // when we have this Student object
  // render the page 'editStudent', aStudent
  // res.render('editStudent', {title: 'Update Student', paok: 'forza paok'})

/* POST update student */
// http://localhost:3000/students/update
router.post('/update', function(req, res, next) {

  // edw twra ti????

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

module.exports = router
