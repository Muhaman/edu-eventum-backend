const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./public/swagger.yaml');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const app = express();

// call the database connectivity function
db();

// var connection = mongoose.connection;

app.use(cors());

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoutes');
const eventRouter = require('./routes/eventRoutes');
const paymentRouter = require('./routes/paymentRoutes');


// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public/uploads/images')));

// for parsing application/json
app.use(bodyParser.json({limit: '50mb', extended: true, parameterLimit: 100000,}));

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000, }));
//form-urlencoded
// for parsing multipart/form-data
app.use(upload.array());

app.use('/', indexRouter)
app.use('/users', usersRouter);
app.use('/events', eventRouter);
app.use('/payments', paymentRouter);

app.use('/files', express.static(path.join(__dirname, 'public/files')));


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
