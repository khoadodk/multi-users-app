const express = require('express');
const router = express.Router();

//Validator
const { runValidation } = require('../validators');
const {
  userRegisterValidator,
  userLoginValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../validators/auth');
//Controller
const {
  register,
  registerActivate,
  login,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

router.post('/register', userRegisterValidator, runValidation, register);
router.post('/register/activate', registerActivate);
router.post('/login', userLoginValidator, runValidation, login);

router.put(
  '/forgot-password',
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  '/reset-password',
  resetPasswordValidator,
  runValidation,
  resetPassword
);

module.exports = router;
