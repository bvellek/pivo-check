const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
// const compression = require('compression');

const app = express();
const { PORT, DATABASE_URL } = require('./config/config');

mongoose.Promise = global.Promise;

// compression for pagespeed
// app.use(compression({ level: 9, threshold: 0 }));

// serve static files including the app bundle
app.use(express.static('./client/build'));

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use passport middleware
app.use(passport.initialize());

// load passport strategies
const localRegistrationStrategy = require('./passport/local-registration');
const localLoginStrategy = require('./passport/local-login');

passport.use('local-registration', localRegistrationStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authentication checker middleware
const authCheckMiddleware = require('./middleware/auth-check');

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

app.use('/api', authCheckMiddleware);
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// all routes that are not the auth or api will be served the react app
app.use('/*', express.static('./client/build'));

let server;
// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run

// this function connects to our database, then starts the server
function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`); // eslint-disable-line
        resolve(PORT);
      })
      .on('error', error => {
        mongoose.disconnect();
        reject(error);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
    console.log('Closing server'); // eslint-disable-line
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  }));
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err)); // eslint-disable-line
}

module.exports = { app, runServer, closeServer };
