const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/UserRoute/userRoutes');
const attendanceRouter = require('./routes/AttandanceRoute/attandanceRoute');
const targetRoute = require('./routes/TargetRoute/targetRoute');
const divisionRoute = require('./routes/GeoRoute/divisionRoute');
const districtRoute = require('./routes/GeoRoute/districtRoute');
const upazilaRoute = require('./routes/GeoRoute/upazilaRoute');
const electoralSeatRoute = require('./routes/GeoRoute/electoralSeatRoute');
const instituteRoute = require('./routes/InstituteRoute/instituteRoute');
const pjpRoute = require('./routes/PjpRoute/pjpRoute');
const issueRoute = require('./routes/IssueRoute/issueRoute');



const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const healthcheck = require('./routes/healtcheckRouter');
const app = express();

// 1) GLOBAL MIDDLEWARES
app.use(cors());
app.options('*', cors());
// Set security HTTP headers
app.use(helmet());

// Development logging
// if (process.env.NODE_ENV === 'development') {

// }
app.use(morgan('dev'));
// Limit requests from same API


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '50MB' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price'
//     ]
//   })
// );

// Serving static files
// app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) ROUTES
app.use('/', healthcheck);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/attendance', attendanceRouter);
app.use('/api/v1/target', targetRoute);

app.use('/api/v1/division', divisionRoute);
app.use('/api/v1/district', districtRoute);
app.use('/api/v1/upazila', upazilaRoute);
app.use('/api/v1/electoralSeat', electoralSeatRoute);
app.use('/api/v1/institute', instituteRoute);
app.use('/api/v1/pjp', pjpRoute);
app.use('/api/v1/issue', issueRoute);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use('/api/v1/route', routeRouter)

// app.use('/api/v1/attendance', attendanceRouter)

// app.use('/api/v1/datadump', DatadumpRouter);


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
