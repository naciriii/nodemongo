const express = require('express');
const router = express.Router();
const _usercontroller = require('../controller/UserController')();

router.get('/', _usercontroller.index);
router.post('/', _usercontroller.store);
router.patch('/', _usercontroller.update);
router.get('/delete/:id', _usercontroller.remove);
router.get('/:id', _usercontroller.show);

module.exports = router;