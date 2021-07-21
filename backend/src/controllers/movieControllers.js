const Movie = require("../models/movie");
const Category = require("../models/category");
const catchAsync = require("../util/catchAsync");

exports.getAllMovie = catchAsync(async (req, res, next) => {
  var name = req.query.name;
  var movies = [];
  if (name) {
    // Find by name
    movies = await Movie.find({
      name: { $regex: name, $options: "i" },
    }).populate("category");
  } else {
    // Find all
    movies = await Movie.find().populate("category");
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

exports.getMovieByCategory = catchAsync(async (req, res, next) => {
  var name = req.query.name;
  if (!name) {
    return res.status(400).json({
      status: "error",
      message: "Missing Category name",
    });
  }

  // Find a category with a given name
  const category = await Category.findOne({ name });
  if (!category) {
    return res.status(404).json({
      status: "error",
      message: "Could not find a Category",
    });
  }

  // Find movie by category
  const movies = await Movie.find({ category }).populate("category");
  res.status(200).json({
    status: "success",
    data: {
      movies,
    },
  });
});

exports.getMovieByID = catchAsync(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
});