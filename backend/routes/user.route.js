const express = require("express");
const { registerUser, loginUser } = require("../controller/user.controller");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 character."),
  ],
  registerUser
);
router.post("/login",[body('email').isEmail().withMessage("Please enter valid email."),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 character.")
], loginUser);

module.exports = router;
