const express = require('express');
const router = express.Router();
const _logincontroller = require('../controller/LoginController')();

router.get('/logout', _logincontroller.logout);
router.get('/login', _logincontroller.index);
router.post('/login',_logincontroller.postLogin)



module.exports = router;