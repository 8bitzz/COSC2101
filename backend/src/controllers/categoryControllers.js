const Category = require("../models/category")
const catchAsync = require("../util/catchAsync")

// Async function to get all categories
exports.getAllCategory = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    data: {
      categories,
    },
  });
});

// Async function to create new categories
exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});
