const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express CRUD small project',
    course: 'Javascríptà No Time',
  });
});

module.exports = router;
