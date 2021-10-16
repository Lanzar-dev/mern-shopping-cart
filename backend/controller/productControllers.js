const { reset } = require("nodemon");
const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createProduct = async (req, res) => {
  const product = new Product({
    name: "sample " + Date.now(),
    imageUrl:
      "https://res.cloudinary.com/lanzar/image/upload/v1631521484/MojeStore/Screenshot_20201123_231701_com.instagram.android_fntmnc.jpg",
    description: "sample description",
    price: 1000,
    countInStock: 1,
  });
  const createdProduct = await product.save();
  res.send({ message: "Product created", product: createdProduct });
};

const updateProductById = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) {
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.countInStock = req.body.countInStock;
    product.imageUrl = req.body.imageUrl;

    const updatedProduct = await product.save();
    res.send({
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const deletedProduct = await product.remove();

    res.send({ message: "Product Deleted", product: deletedProduct });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProduct,
};
