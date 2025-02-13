var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan')
const server = require('./routes/index')
const session = require('express-session')
const multer = require('multer')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'adhfahjsdgfhjagfe', // Ganti dengan kunci rahasia yang aman
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/', server.homeAdmin)
app.use('/', server.admin)
app.use('/', server.penilaianResponden)
app.use('/', server.routeResponden)
app.use('/', server.hasilSurvey)
app.use('/', server.riwayatSurvey)
app.use('/', server.profile)
app.use('/', server.view)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  } else {
    next(err);
  }
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
