var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.routes');
var usersRouter = require('./routes/users.routes');
var itemsRouter = require('./routes/items.routes');

var app = express();

const baseApi = '/api/v1';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${baseApi}/`, indexRouter);
app.use(`${baseApi}/users`, usersRouter);
app.use(`${baseApi}/items`, itemsRouter);

module.exports = app;
