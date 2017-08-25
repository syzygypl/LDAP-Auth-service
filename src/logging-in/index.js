const router = require('express').Router();
const loginHandler = require('./loginHandler');

router.get('/login', loginHandler);

module.exports = router;
