const Cart = require("../models/cart");
const catchAsync = require("../util/catchAsync");

// Async function to get all cart from a logged user
exports.getAllCart = catchAsync(async (req, res, next) => {
  // Get all cart by this user
  const carts = await Cart.find({ createdBy: req.user.id })
    .populate("movie")
    .populate("createdBy");

  // Return data
  res.status(200).json({
    status: "success",
    data: {
      carts,
    },
  });
});

// Async function to create a new cart
exports.createCart = catchAsync(async (req, res, next) => {
  // Get movie id param
  const movieID = req.query.movie_id;

  // Create a cart
  const cart = await Cart.create({
    createdBy: req.user.id,
    movie: movieID,
  });

  // If could not create a cart => error
  if (!cart) {
    return res.status(500).json({
      status: "error",
      message: "Could not create a cart",
    });
  }

  // Return data
  res.status(201).json({
    status: "success",
    data: {
      cart,
    },
  });
});