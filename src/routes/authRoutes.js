const express = require("express");
const router = express.Router();
const {
  getSignupPage,
  getLoginPage,
  signupUser,
  loginUser,
  logoutUser
} = require("../controllers/authController");

router.get("/signup", getSignupPage);
router.post("/signup", signupUser);

router.get("/login", getLoginPage);
router.post("/login", loginUser);

router.get("/logout", logoutUser);

module.exports = router;