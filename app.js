var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// declare the controllers
var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
var studentsRouter = require('./controllers/students')
// var trainersRouter = require('./controllers/trainers')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// define the endpoints (urls)
app.use('/', indexRouter);           // controller index    - /
app.use('/users', usersRouter);      // controller users    - /users
app.use('/students', studentsRouter) // controller students - /students

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  
  res.render('error');
});

module.exports = app;
