const express = require('express');
const router = express.Router();

//Validator
const { runValidation } = require('../validators');
const {
  linkCreateValidator,
  linkUpdateValidator
} = require('../validators/link');

const {
  requireSignin,
  userMiddleware
} = require('../controllers/authController');

//Controller
const {
  create,
  listAll,
  read,
  update,
  remove
} = require('../controllers/linkController');

router.post(
  '/link',
  linkCreateValidator,
  runValidation,
  requireSignin,
  userMiddleware,
  create
);
router.get('/links', listAll);
router.get('/link/:slug', read);
router.put(
  '/link/:slug',
  linkUpdateValidator,
  runValidation,
  requireSignin,
  userMiddleware,
  update
);
router.delete('/link/:slug', requireSignin, userMiddleware, remove);

module.exports = router;
