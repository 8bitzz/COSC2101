const express = require("express");
const router = express.Router();
const {
  getAllMovie,
  createNewMovie,
  getMovieByCategory
} = require("../controllers/movieControllers");

router.get("/", getAllMovie);
router.post("/", createNewMovie);
router.get("/category", getMovieByCategory);

module.exports = router;
