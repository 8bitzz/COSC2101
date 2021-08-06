const express = require("express");
const router = express.Router();
const {
  getAllCategory,
  createCategory
} = require("../controllers/categoryControllers");

router.get("/", getAllCategory);
router.post("/", createCategory);

module.exports = router;
