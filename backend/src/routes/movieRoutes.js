const express = require("express");
const router = express.Router();
const {
  getAllMovie,
  createNewMovie,
  getMovieByCategory,
  getMovieByID
} = require("../controllers/movieControllers");

router.get("/category", getMovieByCategory);
router.get("/", getAllMovie);
router.post("/", createNewMovie);
router.get("/:id", getMovieByID);


module.exports = router;
