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
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id)
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => console.log(err));
      } else {
        this.id = Math.random().toString()
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => console.log(err));
      }
    });
  }

  static delete(id, callback) { // TO CONTINUE FROM HERE
    console.log('HELLO WORLD')
  }

  // We are receiving a callback function here from products.js
  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      cb(product)
    })
  }
};
