const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/userControllers");
const { check } = require("express-validator");

// Endpoint to register user
router.post(
  "/register",
  check("email", "Incorrect email format").isEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an Uppercase"),
  registerUser
);

// Endpoint to login user
router.post("/login", loginUser);

module.exports = router;
