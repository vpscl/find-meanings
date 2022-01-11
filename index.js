// Imports
const express = require("express");
const app = express();
const port = 5000;

// Static Files
app.use(express.static("public"));
// Specific folder example
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/images"));

// Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

// Navigation
app.get("", (req, res) => {
  res.render("index");
});

app.listen(port, () => console.info(`App listening on port ${port}`));
