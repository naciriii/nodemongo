const express = require('express');
const router = express.Router();
const postcontroller = require('../controller/PostController')();
//router.use((req, res, next) => {
   
    if(req.session.user === undefined) {
       // console.log(req.session);

       
        return res.redirect('/login');

    }

    return next();
})//

router.get('/', postcontroller.index);
router.post('/', postcontroller.store);
router.patch('/', postcontroller.update);
router.get('/delete/:id', postcontroller.remove);
router.get('/:id', postcontroller.show);





module.exports = router;