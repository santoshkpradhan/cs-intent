const express = require('express')
var path = require('path');
const jsforce = require('jsforce');
var request = require('request');
var bodyParser = require('body-parser');
var router = express.Router();

var index = require('./index');
const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use('/', index);


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
res.render('error');
});

module.exports = app;

app.listen(3000);