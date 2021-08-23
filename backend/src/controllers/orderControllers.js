const Order = require("../models/order");
const Cart = require("../models/cart");
const catchAsync = require("../util/catchAsync");
const validators = require("credit-card-validate");

// Async function to get all cart items from a logged user
exports.getAllOrders = catchAsync(async (req, res, next) => {
  // Get all cart by this user
  const orders = await Order.find({ createdBy: req.user.id }).populate("movies");

  // Return data
  res.status(200).json({
    status: "success",
    data: {
      orders,
    },
  });
});

// Async function to create a new order with current user cart
exports.createNewOrder = catchAsync(async (req, res, next) => {
  const creditCard = req.body.creditCard;
  const card = new validators.cards.Visa(
    creditCard.number,
    new Date(creditCard.expiredDate),
    creditCard.cvc
  );

  // Validate card data
  if (!card.isValid()) {
    return res.status(500).json({
      status: "error",
      message: "Invalid Credit Visa Card",
    });
  }

  // Get all cart by this user
  const carts = await Cart.find({ createdBy: req.user.id }).populate("movie");
  if (carts.length == 0) {
    return res.status(500).json({
      status: "error",
      message: "Cart is Empty. There is nothing to checkout.",
    });
  }

  // Create a order item
  const movies = carts.map((item) => item.movie);
  const total = movies.map((item) => item.price).reduce(function(acc, val) { return acc + val; }, 0)
  const order = await Order.create({
    createdBy: req.user.id,
    amount: total,
    movies: movies,
  });

  // If could not create an order
  if (!order) {
    return res.status(500).json({
      status: "error",
      message: "Could not create a order",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});
