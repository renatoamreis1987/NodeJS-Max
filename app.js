const path = require("path"); // To get the path - Core module

const express = require("express"); // Express.js

const errorController = require('./controllers/error')

const app = express(); // Use Express

app.set('view engine', 'ejs') // The view engine
app.set('views', 'views') // This line not needed as by default is views, but in case is another folder

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: false })); //To parse requests
app.use(express.static(path.join(__dirname, "public"))); //Serving static files in Express

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
