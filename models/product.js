const fs = require("fs");
const path = require("path");

// The Path to the file as a global variable
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

// Helper function to get the products from file
const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return callback([]); //If there is no file return empty array
    }
    callback(JSON.parse(fileContent)); //Else the fileContent
  });
};

// The structure of our Product as a Class
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => console.log(err));
    });
  }

  // We are receiving a callback function here from products.js
  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
