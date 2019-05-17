const express = require('express');
const router = express.Router();
const _logincontroller = require('../controller/LoginController')();

router.use('login',(req, res, next) => {
  if(req.session.user) {
      return res.redirect('/user');
      
  }

    return next();
})

router.get('/logout', _logincontroller.logout);
router.get('/login', _logincontroller.index);
router.post('/login',_logincontroller.postLogin)





module.exports = router;