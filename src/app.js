require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");
const hotelRoutes = require("./routes/hotelRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});

app.use("/api/v1/hotel" /* /... = see Router => */, hotelRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/review", reviewRoutes);

const port = process.env.PORT || 5000;
async function run() {
  try {
     app.get("/", function(req, res){
       res.send("Hello world");
     })

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run();