const Movie = require("../models/movie");
const Category = require("../models/category");
const catchAsync = require("../util/catchAsync");
const { populateYoutubeThumbnail } = require("../util/utils");

exports.getAllMovie = catchAsync(async (req, res, next) => {
  const name = req.query.name;
  if (name) {
    filterMovieByName(req, res, next);
  } else {
    getMovieAndHighlight(req, res, next);
  }
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
  const category = await Category.findOne({
    name: { $regex: name, $options: "i" },
  });
  if (!category) {
    return res.status(404).json({
      status: "error",
      message: "Could not find a Category",
    });
  }

  // Find movie by category
  var movies = await Movie.find({ category }).populate("category");
  movies = populateYoutubeThumbnail(movies);
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

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

async function filterMovieByName(req, res, next) {
  const name = req.query.name;

  // Find by name
  const text = escapeRegExp(name);
  var movies = await Movie.find({
    title: { $regex: text, $options: "i" },
  }).populate("category");

  // Populate Youtube thumnail
  movies = populateYoutubeThumbnail(movies);
  res.status(200).json({
    status: "success",
    data: {
      movies,
    },
  });
}

async function getMovieAndHighlight(req, res, next) {
  var movies = [];

  // Find all
  var allMovies = await Movie.find().populate("category");
  allMovies = populateYoutubeThumbnail(allMovies);

  // Get all movie and group by category
  var cacheData = {};
  allMovies.forEach((movie) => {
    const category = movie.category;
    var movieList = cacheData[category.name] ?? [];
    movieList.push(movie);
    cacheData[category.name] = movieList;
  });

  // Map to { category. movies } for each category
  const categories = await Category.find();
  categories.forEach((category) => {
    const categoryMovies = cacheData[category.name];
    if (categoryMovies) {
      movies.push({
        category,
        movies: categoryMovies,
      });
    }
  });

  res.status(200).json({
    status: "success",
    data: {
      movies,
    },
  });
}