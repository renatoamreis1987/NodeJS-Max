const Product = require("../models/product");
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  // We are passing a callback function here: products to get the data to this render directly
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; // We will get the productId from shop.js routers :productId
  Product.findById(prodId, (product) =>
    res.render("shop/product-detail", {
      product: product,
      docTitle: product.title,
      path: "/products",
    })
  );
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      docTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    docTitle: "Your Cart",
  });
};

exports.postCart = (req, res, next) => {
  // The bellow line comes from 'name="productId"' on product-detail.ejs
  const prodId = req.body.productId
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price)
  })
  res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    docTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    docTitle: "Checkout",
  });
};
