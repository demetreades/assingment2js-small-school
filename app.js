const express = require('express');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');

const indexRouter = require('./controllers/index');
const studentsRouter = require('./controllers/students');
const trainersRouter = require('./controllers/trainers');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/students', studentsRouter);
app.use('/trainers', trainersRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log('ERRORHANDLER: ', err.message, err.statusCode);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  res.render('error', { title: 'Oops error' });
});

module.exports = app;
