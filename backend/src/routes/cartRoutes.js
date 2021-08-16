const express = require("express");
const router = express.Router();
const {
  getAllCart,
  createCart
} = require("../controllers/cartController");
const { isAuthenticated } = require("../controllers/userControllers");

// Endpoint to get all cart from a loggin user
router.get("/", isAuthenticated, getAllCart);
router.post("/", isAuthenticated, createCart);

module.exports = router;
