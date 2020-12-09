const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const logger = require("morgan");

// Requirer models
const db = require("./models")

// Morgan for logging requests
app.use(logger("dev"));

// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/savedBooks";

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`ðŸŒŽ ==> API server now on port ${PORT}!`);
});