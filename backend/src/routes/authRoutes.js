const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/userControllers");
const { check } = require("express-validator");

// REGISTER
router.post(
  "/register",
  check("email", "Incorrect email format").isEmail(),
  check("password", "Password must be 8+ chars long.").isLength({ min: 8 }),
  registerUser
);

// LOGIN
router.post("/login", loginUser);

module.exports = router;
