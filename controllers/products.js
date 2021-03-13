const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // We are passing a callback function here: products to get the data to this render directly
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      docTitle: "Shop",
      path: "/",
    });
  });
};
