var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require("./config/db.config");

const apiRouter = require('./routes/index.routes');

var app = express();
db.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', apiRouter);

module.exports = app;
