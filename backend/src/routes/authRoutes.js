const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/userControllers");
const { check } = require("express-validator");

// Endpoint to register user
router.post(
  "/register",
  check("email", "Incorrect email format").isEmail(),
  check("password", "Password must be 8+ chars long.").isLength({ min: 8 }),
  registerUser
);

// Endpoint to login user
router.post("/login", loginUser);

module.exports = router;
