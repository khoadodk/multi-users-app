const express = require('express');
const router = express.Router();

//Controller
const {
  requireSignin,
  userMiddleware,
  adminMiddleware
} = require('../controllers/authController');

const { read } = require('../controllers/userController');

router.get('/user', requireSignin, userMiddleware, read);
router.get('/admin', requireSignin, adminMiddleware, read);

module.exports = router;
