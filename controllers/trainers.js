const express = require('express');
const router = express.Router();3

const trainerService = require('../services/trainerService');
const courseService = require('../services/courseService');
const subjectService = require('../services/subjectService');

const Trainer = require('../models/trainer').Trainer;


router.get('/', function(req, res) {
  trainerService.view().then((result) => {
    res.render('trainers/summary', { title: 'Trainers summary', trainersArray: {data: result} });
  });
});

router.get('/new', function(req, res) {
  courseService.readAll().then((courses) => {
    subjectService.readAll().then((subjects) => {
      res.render('trainers/new', { title: 'Trainers insert', courses, subjects });
    });
  });
});

router.get('/delete/:id', function(req, res) {
  trainerService.remove(req.params.id).then((result) => {
    if(result.affectedRows == 1) {
      trainerService.view().then((result) => {
        res.render('trainers/summary', { title: 'Trainers summary', trainersArray: {data: result} })
      });
    } else {
      res.render('/trainers/summary',{ title: 'Trainers summary'});
    }
  });
});

router.get('/update/:id', function(req, res) {
  trainerService.find(req.params.id).then((trainer) => {
    if(trainer.id == req.params.id) {
      courseService.readAll().then(courses => {
        subjectService.readAll().then(subjects => {
          res.render('./trainers/edit', { title: 'Trainers update', trainer, courses, subjects });
        });
      });
    }
  });
});

router.post('/update', function(req, res) {
  const trainer = new Trainer(req.body.id, req.body.first_name, req.body.last_name, req.body.subjects, req.body.courses);
  trainerService.update(trainer).then((result) => {
    if(result.affectedRows == 1) {
      trainerService.view().then((result) => {
        res.render('trainers/summary', { title: 'Trainers', trainersArray: {data: result} });
      });
    }
  });
});

router.post('/', function(req, res) {
  const trainer = new Trainer(req.body.id, req.body.first_name, req.body.last_name, req.body.subjects, req.body.courses); 
  trainerService.insert(trainer).then((result) => {
    if(result.affectedRows == 1) {
      trainerService.view().then((result) => {
        res.render('trainers/summary', { title: 'Trainers', trainersArray: {data: result} });
      });
    } else {
      res.render('/trainers/new');
    }
  });
});

module.exports = router;
