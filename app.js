const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");
const blogRoutes = require("./routes/blog-routes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

mongoose
  .connect(
    "mongodb+srv://muhammadilyas:523221ali@nodejs-cluster.iu8pnvx.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8000);
  })
  .then(() => {
    console.log("DB Connected...");
  })
  .catch((err) => console.log(err));
