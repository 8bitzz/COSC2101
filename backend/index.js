var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var cors = require("cors");
require("dotenv").config();

// Import routes
const productRoutes = require("./src/routes/productRoutes");

// App config
var app = express();
var PORT = process.env.PORT;

//MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB is connected")
});

//Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(req.url)
    next();
});

// Routes
app.use("/products", productRoutes);

// Default route
app.get("/", function (req, res) {
    res.send(`Restful API is running on port ${PORT}!`);
});

// Express App initialize
app.listen(PORT, function () {
    console.log(`Your server is running on port ${PORT}`);
});