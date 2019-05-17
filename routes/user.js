const express = require('express');
const router = express.Router();
const _usercontroller = require('../controller/UserController')();
router.use((req, res, next) => {
   
    if(req.session.user === undefined) {
       // console.log(req.session);

       
        return res.redirect('/login');

    }

    return next();
})

router.get('/', _usercontroller.index);
router.post('/', _usercontroller.store);
router.get('/delete/:id', _usercontroller.remove);
router.get('/:id', _usercontroller.show);





module.exports = router;