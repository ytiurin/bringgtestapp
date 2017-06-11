var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var Promise      = require("bluebird");
var mongoose     = require('mongoose');

var config       = require('./config');

var app = express();
mongoose.Promise = Promise;
mongoose.connect(config.appDBAddr);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));

// API ENDPOINTS
app.use(`${config.appAPIPath}`,        require('./routes/api/index'));
app.use(`${config.appAPIPath}/orders`, require('./routes/api/orders'));

// API catch message and forward it to error handler
app.use(config.appAPIPath, function(msg, req, res, next) {
  var err = new Error(msg);
  err.api = true;
  next(err);
});

// API catch 404 and forward to error handler
app.use(config.appAPIPath, function(req, res, next) {
  var err = new Error('Unrecognized API entity.');
  err.status = 404;
  err.api = true;
  next(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (err.api)
    res.json({ status: 'error', message: err.message });
  else
    res.render('error');
});

module.exports = app;
