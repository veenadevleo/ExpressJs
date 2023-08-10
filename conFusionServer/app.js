var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser=require('body-parser'); 
var logger = require('morgan');
var session=require('express-session');
var FileStore=require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promotionRouter = require('./routes/promotionRouter');
var leaderRouter = require('./routes/leaderRouter');

const mongoose = require('mongoose');
mongoose.Promise=require('bluebird');

const Dishes = require('./models/dishes');
const Promotion = require('./models/promotions');
const Leader = require('./models/leaders');


const url = 'mongodb://localhost:27017/confusion';
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

connect.then((db) => {
  console.log('Connected correctly to server');
}, (err) => {
  console.log(err);
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
  name:'session-id',
  secret:'12345-67890-09876-54321',
  saveUninitialized:false,
  store:new FileStore()
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth(req, res, next) {
  console.log(req.session);

  if(!req.session.user){
    var err = new Error('You are not authenticated!');
    err.status = 401;
    return next(err);
  }
  else{
    if(req.session.user==='authenticated'){
      next();
    }
    else{
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
    }
  }

}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));




app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;
