var express = require("express");
var mongoose = require("mongoose");
var helmet = require("helmet");
var cors = require("cors");
let morgan = require('morgan');
let config = require('config');
const path = require('path');
const AppError = require("./src/util/appError");
require("dotenv").config();

// Import routes
const categoryRoutes = require("./src/routes/categoryRoutes");
const movieRoutes = require("./src/routes/movieRoutes");
const authRoutes = require("./src/routes/authRoutes");

// App config
var app = express();
const PORT = process.env.PORT || 4000;

//MongoDB connect
mongoose.connect(config.DBHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`MongoDB is connected at ${config.DBHost}`);
});

// Omit tests output
if(config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined'));
}

//Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.json());

// Serve web app
const buildPath = path.join(__dirname, '..', 'frontend', 'build');
app.use(express.static(buildPath));

// Routes
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/auth", authRoutes);

// Express App initialize
app.listen(PORT, function () {
  console.log(`Your server is running on port ${PORT}`);
});

module.exports = app; // for testing
