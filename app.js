const path = require("path"); // To get the path - Core module

const express = require("express"); // Express.js

const app = express(); // Use Express

app.set('view engine', 'ejs') // The view engine
app.set('views', 'views') // This line not needed as by default is views, but in case is another folder

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: false })); //To parse requests
app.use(express.static(path.join(__dirname, "public"))); //Serving static files in Express

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", {docTitle: 'Page Not Found¡' })
});

app.listen(3000);
