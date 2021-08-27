const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    res.json({ message: error });
  }
});
//ADD PRODUCT
router.post("/", async (req, res) => {
  console.log(req.body);
  const product = new Product({
    productName: req.body.params.productName,
    price: req.body.params.price,
    image: req.body.params.imageUrl,
  });
  try {
    const addProduct = await product.save();
    res.json(addProduct);
  } catch (error) {
    res.json({ message: error });
  }
});

//GET PRODUCT WITH ID
router.get("/:productID", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productID);
    res.json(product);
  } catch (error) {
    res.json({ message: error });
  }
});

//Delete Product
router.delete("/:productID", async (req, res) => {
  try {
    const removeProduct = await Product.remove({ _id: req.params.productID });
    res.json(removeProduct);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
