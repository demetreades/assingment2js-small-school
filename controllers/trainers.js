const express = require('express');

const trainerService = require('../services/trainerService');
const courseService = require('../services/courseService');
const subjectService = require('../services/subjectService');

const router = express.Router();

router.get('/', (req, res) => {
  trainerService.view().then((result) => {
    res.render('trainers/summary', {
      title: 'Trainers summary',
      trainersArray: { data: result },
    });
  });
});

router.get('/new', (req, res) => {
  courseService.readAll().then((courses) => {
    subjectService.readAll().then((subjects) => {
      res.render('trainers/new', {
        title: 'Trainers insert',
        courses,
        subjects,
      });
    });
  });
});

router.get('/delete/:id', (req, res) => {
  trainerService.remove(req.params.id).then((result) => {
    if (result.affectedRows == 1) {
      res.redirect('/trainers');
    } else {
      res.render('/error');
    }
  });
});

router.get('/update/:id', (req, res) => {
  trainerService.find(req.params.id).then((trainer) => {
    if (trainer.id == req.params.id) {
      courseService.readAll().then((courses) => {
        subjectService.readAll().then((subjects) => {
          res.render('./trainers/edit', {
            title: 'Trainers update',
            trainer,
            courses,
            subjects,
          });
        });
      });
    }
  });
});

router.post('/update', (req, res) => {
  const trainer = trainerService.newTrainer(req);

  trainerService.update(trainer).then((result) => {
    if (result.affectedRows === 1) {
      res.redirect('/trainers');
    }
  });
});

router.post('/', (req, res) => {
  const trainer = trainerService.newTrainer(req);

  trainerService.insert(trainer).then((result) => {
    if (result.affectedRows === 1) {
      res.redirect('/trainers');
    } else {
      res.render('/trainers/new');
    }
  });
});

module.exports = router;
