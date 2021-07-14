const router = require("express").Router();
const { getAllProducts } = require("../controllers/productControllers");

router.get("/", getAllProducts);

module.exports = router;
