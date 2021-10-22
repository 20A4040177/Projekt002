var createError = require('http-errors');
var express = require('express');
const session = require("express-session");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var topup = require('./routes/topup');
var history = require('./routes/history');
var app = express();
var isAuth=require('./middleware/isauth');
var isNotAuth=require('./middleware/isnotauth');
const isnotauth = require('./middleware/isnotauth');
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.post('/login',usersRouter.login);
app.get('/userpage',isAuth,usersRouter.getUserPage);
app.get('/topup',isAuth, topup.view);
app.get('/success',isAuth, topup.success);
app.get('/nextstep',isAuth, topup.next);
app.get('/history',isAuth, history.view);
app.get('/confirm',isAuth, topup.confirm);
app.get('/register', usersRouter.register);
app.post('/register_post',usersRouter.register_post);
app.post('/logout',usersRouter.logout);
app.post('/editcontact',usersRouter.editcontact);
app.post('/deletecontact',usersRouter.deletecontact);
app.post('/proceed',topup.check);
app.listen(3000);
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
