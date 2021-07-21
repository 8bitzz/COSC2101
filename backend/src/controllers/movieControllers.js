const Movie = require("../models/movie")
const catchAsync = require("../util/catchAsync")

exports.getAllMovie = catchAsync(async (req, res, next) => {

  var name = req.query.name;
  var movies = []
  if (name) {
    // Find by name
    movies = await Movie.find({name: {$regex: name, $options: 'i'}});
  } else {
    // Find all
    movies = await Movie.find();
  }
  
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