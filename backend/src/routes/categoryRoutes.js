const express = require("express");
const router = express.Router();
const {
  getAllCategory,
  createCategory
} = require("../controllers/categoryControllers");

// Endpoint to get all categories
router.get("/", getAllCategory);

// Endpoint to create new categories
router.post("/", createCategory);

module.exports = router;
