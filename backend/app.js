const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const debug = require('debug')
const morgan = require('morgan');
require('dotenv').config();

require('./config/passport'); 
const passport = require('passport'); 
app.use(passport.initialize());

//Express server secrity
const cors = require('cors');
const csurf = require('csurf');
const { isProduction } = require('./config/keys');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());

// Security Middleware
if (!isProduction) {
  // Enable CORS only in development because React will be on the React
  // development server (http://localhost:3000). (In production, the Express 
  // server will serve the React files statically.)
  app.use(cors());
}
// Set the _csrf token and create req.csrfToken method to generate a hashed
// CSRF token
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/jokes.route'));

// user routes
const usersRouter = require('./routes/users.route');
app.use('/api/users', usersRouter);
//csrf routes
const csrfRouter = require('./routes/csrf');
app.use('/api/csrf', csrfRouter);

app.use((req, res, next) => {
  next(createError.NotFound());
});
// Express custom middleware for catching all unmatched requests and formatting
// a 404 error to be sent as the response.
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug('backend:error');

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
module.exports = app