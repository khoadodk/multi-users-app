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
  userMiddleware,
  adminMiddleware
} = require('../controllers/authController');

//Controller
const {
  create,
  listAll,
  read,
  update,
  remove,
  clickCount,
  popularInACategory,
  list
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
router.get('/link/:id', read);
router.put(
  '/link/:id',
  linkUpdateValidator,
  runValidation,
  requireSignin,
  userMiddleware,
  update
);
router.delete('/link/:id', requireSignin, userMiddleware, remove);
router.put('/click-count', clickCount);
//Get all links in a category
router.get('/category/:slug', popularInACategory);

// admin link
router.post('/links', requireSignin, adminMiddleware, list);

module.exports = router;
