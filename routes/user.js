const express = require("express");
const router = express.Router();
const wrapAsync = require("../utlis/wrapAsync");
const User = require("../models/users.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

router.route("/signup").post(wrapAsync(userController.signup));

// .get(userController.renderSignupForm)

router.route("/login").post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/listings",
    failureFlash: true,
  }),
  userController.login
);

// .get(userController.renderLoginForm)

//Logout route

router.get("/logout", userController.logout);

module.exports = router;
