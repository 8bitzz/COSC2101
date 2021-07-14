const getAllProducts = async (req, res) => {
  try {
      const products = [];
      res.json(products);
  } catch (error) {
      return res.status(400).send(error);
  }
};

module.exports = {
  getAllProducts
};
