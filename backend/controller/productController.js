const { get } = require("mongoose");
const ProductModel = require("../models/productModel");

const fs = require("fs");
const orderModel = require("../models/orderModel");

exports.addProduct = async (req, res) => {
  let productToAdd = await ProductModel.create({
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_description: req.body.product_description,
    product_rating: req.body.product_rating,
    count_in_stock: req.body.count_in_stock,
    product_image: req.file?.path,
    category: req.body.category,
  });
  if (!productToAdd) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.send(productToAdd);
};

//get detail of aall products
exports.getAllProduct = async (req, res) => {
  let product = await ProductModel.find().populate("category");
  if (!product) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.send(product);
};

//get product details
exports.getProductDetails = async (req, res) => {
  let product = await ProductModel.findById(req.params.id).populate("category");
  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }
  res.send(product);
};

//get product by category
exports.getProductByCategory = async (req, res) => {
  let product = await ProductModel.find({ category: req.params.categoryId });

  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }

  res.send(product);
};

//update product
exports.updateProduct = async (req, res) => {
  if (req.file) {
    let product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.json({ error: "Something went wrong" });
    }
    if (fs.existsSync(product.product_image)) {
      fs.unlinkSync(product.product_image);
    }
  }

  let productToUpdate = await ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_description: req.body.product_description,
      product_rating: req.body.product_rating,
      count_in_stock: req.body.count_in_stock,
      product_image: req.file?.path,
      category: req.body.category,
    },
    { new: true }
  );

  if (!productToUpdate) {
    return res.status(400).json({ error: " Something went wrong" });
  }
  res.send(productToUpdate);
};

//deleting product
exports.deleteProduct = (req, res) => {
  ProductModel.findByIdAndDelete(req.params.id)
    .then((deleteProduct) => {
      if (!deleteProduct) {
        return res.status(400).json({ error: "Product Not Found" });
      } else {
        if (deleteProduct.product_image) {
          if (fs.existsSync(deleteProduct.product_image)) {
            fs.unlinkSync(deleteProduct.product_image);
          }
        }
        return res.send({ message: "Product deleted successfully" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

exports.getFilteredProducts = async (req, res) => {
  let filterArgs = {};
  for (var key in req.body) {
    if (req.body[key].length > 0) {
      if (key == "category") {
        filterArgs[key] = req.body[key];
      } else {
        filterArgs[key] = {
          $lte: req.body[key][1],
          $gte: req.body[key][0],
        };
      }
    }
  }
  console.log("frontend", req.body, "Backend", filterArgs);

  let products = await ProductModel.find(filterArgs).populate("category");
  if (!products) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send(products);
};

exports.getRelatedProducts = async (req, res) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }

  let products = await ProductModel.find({
    category: product.category,
    _id: { $ne: product._id },
  }).populate("category");
  if (!products) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send(products);
};

exports.getTrendingProducts = async (req, res) => {
  try {
    const trendingProducts = await orderModel.aggregate([
      // Join orderItems array
      {
        $lookup: {
          from: "orderitems", // collection name (lowercase plural by MongoDB)
          localField: "orderItems",
          foreignField: "_id",
          as: "orderItemsDetails",
        },
      },
      // Unwind the order items
      { $unwind: "$orderItemsDetails" },

      // Group by product and count quantity
      {
        $group: {
          _id: "$orderItemsDetails.product",
          totalSold: { $sum: "$orderItemsDetails.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 8 },

      // Lookup product details
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },

      // Final projection
      {
        $project: {
          _id: "$productDetails._id",
          title: "$productDetails.product_name",
          price: "$productDetails.product_price",
          image: "$productDetails.product_image",
          totalSold: 1,
        },
      },
    ]);

    res.status(200).json(trendingProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch trending products" });
  }
};
