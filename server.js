const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const logger = require("morgan");

// Requirer models
const db = require("./client/models/");

// Morgan for logging requests
app.use(logger("dev"));

// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Book", { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

// API routes

app.get("/api/book", (req,res) => {
  db.Book.find({},function(err, docs) {
    if (!err){ 
        res.json(docs)
    } else {throw err;}
});
})

app.post("/api/book/post",(req,res) =>{
  console.log("the route is hit****")
  db.Book.create(req.body)
  .catch((err)=>{res.json(err)})
})

app.delete("/api/book/:id",(req,res)=>{
  db.Book.deleteOne({_id: req.params.id}).then((err,data)=>{
    if(err){res.json(err)};
  })
})

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`ðŸŒŽ ==> API server now on port ${PORT}!`);
});