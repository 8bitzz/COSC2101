const express = require("express");
const router = express.Router();
const {
  getAllMovie,
  createNewMovie,
  getMovieByCategory,
  getMovieByID
} = require("../controllers/movieControllers");

// Endpoint to get all movies in a category
router.get("/category", getMovieByCategory);

// Endpoint to get all movies in all categories
router.get("/", getAllMovie);

// Endpoint to create new movies
router.post("/", createNewMovie);

// Endpoint to get a movie by a given ID
router.get("/:id", getMovieByID);

module.exports = router;
