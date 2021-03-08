const path = require("path"); // To get the path - Core module

const express = require("express"); // Express.js

const app = express(); // Use Express

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: false })); //To parse requests
app.use(express.static(path.join(__dirname, "public"))); //Serving static files in Express

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
