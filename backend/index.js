var express = require("express");
var mongoose = require("mongoose");
var helmet = require("helmet");
var cors = require("cors");
let morgan = require('morgan');
let config = require('config');
const AppError = require("./src/util/appError");
require("dotenv").config();

// Import routes
const categoryRoutes = require("./src/routes/categoryRoutes");
const movieRoutes = require("./src/routes/movieRoutes");
const authRoutes = require("./src/routes/authRoutes");

// App config
var app = express();
var PORT = process.env.PORT;

//MongoDB
mongoose.connect(config.DBHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB is connected");
});

// Omit tests output
if(config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined'));
}

//Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// Routes
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.all("*", (req, res, next) => {
  next(new AppError(`Given url ${req.originalUrl} does not exist`, 404));
});

// Express App initialize
app.listen(PORT, function () {
  console.log(`Your server is running on port ${PORT}`);
});

module.exports = app; // for testing
