const express = require('express');
const router = express.Router();
const trainerService = require('../services/trainerService');
const Trainer = require('../models/trainer').Trainer;


router.get('/', function(req, res) {
  trainerService.readAll().then((result) => {
    res.render('trainers/summary', { title: 'Trainers summary', trainersArray: {data: result} });
  });
});

router.get('/new', function(req, res) {
  res.render('trainers/new', { title: 'Trainers insert' });
});

router.get('/delete/:id', function(req, res) {
  trainerService.remove(req.params.id).then((result) => {
    if(result.affectedRows == 1) {
      trainerService.readAll().then((result) => {
        res.render('trainers/summary', { title: 'Trainers summary', trainersArray: {data: result} })
      });
    } else {
      res.render('/trainers/summary',{ title: 'Trainers summary'});
    }
  });
});

router.get('/update/:id', function(req, res) {
  trainerService.find(req.params.id).then((result) => {
    if(result.id  == req.params.id) {
      res.render('./trainers/edit', { title: 'Trainers update', result });
    }
  });
});

router.post('/update', function(req, res) {

  const trainer = new Trainer(req.body.id, req.body.first_name, req.body.last_name, req.body.tuition_fees, req.body.date_of_birth);

  trainerService.update(trainer).then((result) => {
    if(result.affectedRows == 1) {
      trainerService.readAll().then((result) => {
        res.render('trainers/summary', { title: 'Trainers summary', trainersArray: {data: result} });
      });
    }
  });
});

router.post('/', function(req, res) {

  const trainer = new Trainer(req.body.id, req.body.first_name, req.body.last_name, req.body.tuition_fees, req.body.date_of_birth);

  trainerService.insert(trainer).then((result) => {
    if(result.affectedRows == 1) {
      trainerService.readAll().then((result) => {
        res.render('trainers/summary', { title: 'Trainers', trainersArray: {data: result} });
      });
    } else {
      res.render('/trainers/new');
    }
  });
});


module.exports = router;
