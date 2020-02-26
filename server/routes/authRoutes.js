const express = require('express');
const router = express.Router();

//Validator
const { runValidation } = require('../validators');
const {
  userRegisterValidator,
  userLoginValidator
} = require('../validators/auth');
//Controller
const { register, login } = require('../controllers/authController');

router.post('/register', userRegisterValidator, runValidation, register);
router.post('/login', userLoginValidator, runValidation, login);

module.exports = router;
