const noAuth = (res, e) => res.status(401).send(e);
const loginVerifier = require('./loginVerifier');
const ldapLib = require('ldapjs');
const loginVerifierService = loginVerifier.bind(null, ldapLib);


module.exports = (req, res) => {
  loginVerifierService(req.auth.user, req.auth.password)
    .then((e) => { res.send(e) })
    .catch(e => noAuth(res, e));
};
