const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  createNewOrder
} = require("../controllers/orderControllers");
const { isAuthenticated } = require("../controllers/userControllers");

// Endpoint to get all cart from a loggin user
router.get("/", isAuthenticated, getAllOrders);
router.post("/", isAuthenticated, createNewOrder);

module.exports = router;