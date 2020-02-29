const express = require('express');
const router = express.Router();

//Validator
const { runValidation } = require('../validators');
const {
  categoryCreateValidator,
  categoryUpdateValidator
} = require('../validators/category');

const {
  requireSignin,
  adminMiddleware
} = require('../controllers/authController');

//Controller
const {
  create,
  listAll,
  read,
  update,
  remove
} = require('../controllers/categoryController');

router.post(
  '/category',
  categoryCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);
router.get('/categories', listAll);
router.post('/category/:slug', read);
router.put(
  '/category/:slug',
  categoryUpdateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  update
);
router.delete('/category/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;
