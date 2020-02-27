const express = require('express');
const router = express.Router();

//Validator
const { runValidation } = require('../validators');
const {
  userRegisterValidator,
  userLoginValidator
} = require('../validators/auth');
//Controller
const {
  register,
  registerActivate,
  login
} = require('../controllers/authController');

router.post('/register', userRegisterValidator, runValidation, register);
router.post('/register/activate', registerActivate);
router.post('/login', userLoginValidator, runValidation, login);

module.exports = router;
