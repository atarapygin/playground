const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../src/templates/views");
const partialsPath = path.join(__dirname, "../src/templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Anonymous",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Anonymous",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Anonymous",
    helpText: "This is the help page",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Anonymous",
    helpText: "Help article not found",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "In the middle of nowhere",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Help",
    name: "Anonymous",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
