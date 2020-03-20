const express = require("express");
const router = express.Router();

//Validator
const { runValidation } = require("../validators");
const {
  linkCreateValidator,
  linkUpdateValidator
} = require("../validators/link");

const {
  requireSignin,
  userMiddleware,
  adminMiddleware
} = require("../controllers/authController");

//Controller
const {
  create,
  listAll,
  read,
  update,
  remove,
  clickCount,
  popular,
  popularInACategory,
  list,
  likeCount
} = require("../controllers/linkController");

router.post(
  "/link",
  linkCreateValidator,
  runValidation,
  requireSignin,
  userMiddleware,
  create
);
router.get("/links", listAll);
router.get("/link/:id", read);
router.put(
  "/link/:id",
  linkUpdateValidator,
  runValidation,
  requireSignin,
  userMiddleware,
  update
);
router.delete("/link/:id", requireSignin, userMiddleware, remove);
router.put("/click-count", clickCount);
router.put("/like-count", requireSignin, userMiddleware, likeCount);

//popular links
router.get("/links/popular", popular);
router.get("/links/popular/:slug", popularInACategory);

// admin links
router.post("/links", requireSignin, adminMiddleware, list);

module.exports = router;
