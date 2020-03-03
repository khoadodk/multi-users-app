const express = require('express');
const router = express.Router();

//Validator
const { runValidation } = require('../validators');
const { userUpdateValidator } = require('../validators/auth');

//Controller
const {
  requireSignin,
  userMiddleware,
  adminMiddleware
} = require('../controllers/authController');

const { read, update } = require('../controllers/userController');

router.get('/user', requireSignin, userMiddleware, read);
router.get('/admin', requireSignin, adminMiddleware, read);

router.put(
  '/user/update',
  userUpdateValidator,
  runValidation,
  requireSignin,
  userMiddleware,
  update
);

module.exports = router;
