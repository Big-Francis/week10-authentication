const express = require('express');
const {loginUser,
     registerUser} = require('../controller/userController.js')
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;