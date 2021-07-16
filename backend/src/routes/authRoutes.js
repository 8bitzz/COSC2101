const router = require("express").Router();
const { registerUser } = require("../controllers/userControllers");

// REGISTER
router.post("/register", registerUser);

module.exports = router;