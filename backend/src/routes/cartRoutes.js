const express = require("express");
const router = express.Router();
const {
  getAllCart,
  createCart,
  deleteCartItem
} = require("../controllers/cartController");
const { isAuthenticated } = require("../controllers/userControllers");

// Endpoint to get all cart from a loggin user
router.get("/", isAuthenticated, getAllCart);
router.post("/", isAuthenticated, createCart);
router.delete("/", isAuthenticated, deleteCartItem);

module.exports = router;
