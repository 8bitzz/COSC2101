const Movie = require("../models/movie")
const catchAsync = require("../util/catchAsync")

exports.getAllMovie = catchAsync(async (req, res, next) => {
  const movies = await Movie.find();

  res.status(200).json({
    status: "success",
    data: {
      movies,
    },
  });
});

exports.createNewMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      movie,
    },
  });
});