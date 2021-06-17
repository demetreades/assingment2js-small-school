const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService')
const Student = require('../models/student').Student


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
  studentService.selectById(req.params.id, 'SELECT', 'students').then((result) => {
   //   console.log(result);
     let yStudent = new Student(result[0].id, result[0].student_first, result[0].student_last, result[0].hobby)
     console.log(yStudent.toString());
     res.render('editStudent', { yStudent });
  })

})

/* POST update student */
// http://localhost:3000/students/update
router.post('/update', function(req, res, next) {
   let editStudent = new Student(req.body.id, req.body.fname, req.body.lname, req.body.hobby)
   console.log(editStudent);
   studentService.updateStudent(editStudent).then((result)=>{
      if(result.affectedRows == 1){
         studentService.getAllStudents().then((result) =>{
         res.render('students', {title:'Students', studentsArray: {data: result}})
      });
      } else {
         res.render('error')
      }
   });

});

/* POST a student */
router.post('/', function(req, res, next) {
  // console.log(req.body)
  let aStudent = new Student(req.body.id, req.body.fname, req.body.lname, req.body.hobby)
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
    
  });
});

module.exports = router
