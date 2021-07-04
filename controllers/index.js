const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express CRUD small project', course: 'Javascripta No Time' });
});

module.exports = router;
