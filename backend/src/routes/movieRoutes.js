const express = require("express");
const router = express.Router();
const {
  getAllMovie,
  createNewMovie
} = require("../controllers/movieControllers");

router.get("/", getAllMovie);
router.post("/", createNewMovie);

module.exports = router;
