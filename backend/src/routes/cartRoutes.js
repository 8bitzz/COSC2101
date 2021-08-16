const express = require("express");
const router = express.Router();
const {
  getAllCart
} = require("../controllers/cartController");

// Endpoint to get all cart from a loggin user
router.get("/", getAllCart);

module.exports = router;
