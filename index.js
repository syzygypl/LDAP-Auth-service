const fs = require('fs');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const loggingInRouter = require('./src/logging-in');
const loginVerifier = require('./src/logging-in/loginVerifier');
const basicAuth = require('express-basic-auth')
const ldapLib = require('ldapjs');

const loginVerifierService = loginVerifier.bind(null, ldapLib);
const app = express();
const asyncAuthorizer = (username, password, cb) => {
  loginVerifierService(username, password)
    .then(() => {
      cb(null, true);
    }).catch(() => {
      cb(null, false);
    });
};

app.use(basicAuth({
  authorizer: asyncAuthorizer,
  authorizeAsync: true,
  challenge: true,
  realm: process.env.BASIC_AUTH_REALM
}));

app.use(cors());
app.use(bodyParser.json());
app.use(loggingInRouter);

app.listen(process.env.PORT, function () {
  console.log('Up and running without SSL on port ' + process.env.PORT);
});
