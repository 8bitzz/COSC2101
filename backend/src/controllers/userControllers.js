const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const catchAsync = require("../util/catchAsync")

// Async function to register new user
const registerUser = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password ) {
    return res.status(401).json("Missing email or password field");
  }
  // Validate email and password
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check if there is any account registered with the email address
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(401).json("Email has been registered");
  }

  // Create new user object from request body, hashing password with AES before saving to db
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  // Try saving user in MongoDB and throw error 500 if error
  try {
    const user = await newUser.save();

    // Generate JWT accessToken
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    // Extract password from response body
    const { password, ...userInfo } = user._doc;

    res.status(201).json({ ...userInfo, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Async function to login user
const loginUser = catchAsync(async (req, res, next) => {
  try {
    // Return error 401 if missing requestion body
    if (!req.body.email || !req.body.password ) {
      return res.status(401).json("Missing email or password field");
    }
    // Check if there is any account registered with the email address 
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Can not find any user with that email address");
    }

    // Check if password is matched with registered password or not
    // Use CryptoJS to decrypt the original password
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    // Compare original password with the password from request body
    if (originalPassword !== req.body.password) {
       return res.status(401).json("Incorrect password");
    } 
    // Generate JWT accessToken
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    // Extract password from response body
    const { password, ...userInfo } = user._doc;

    // Return accessToken in response
    res.status(200).json({ ...userInfo, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get the JWT token and check the authentication
const isAuthenticated = catchAsync(async (req, res, next) => {
  let token;

  // Get the authorization header
  const authHeader = req.headers.authorization;

  // Parse the token
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Return 401 status code if the autorization header is absent
  if (!token) {
    return res.status(401).json("Invalid user authorization");
  }

  // Decode and get user from mongoDB
  const decodedToken = await promisify(jwt.verify)(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  req.user = user;

  // Pass it to next middlewares
  next();
});

module.exports = {
  registerUser,
  loginUser,
  isAuthenticated
};
