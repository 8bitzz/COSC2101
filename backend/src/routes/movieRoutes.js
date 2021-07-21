const express = require("express");
const router = express.Router();
const {
  getAllMovie,
  createNewMovie,
  getMovieByCategory,
  getMovieByID
} = require("../controllers/movieControllers");

router.get("/", getAllMovie);
router.post("/", createNewMovie);
router.get("/:id", getMovieByID);
router.get("/category", getMovieByCategory);

module.exports = router;
