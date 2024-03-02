const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/auth");
const profileRoutes = require("./src/routes/profile");

const app = express();
const port = process.env.PORT || 8080;

const dbURI = process.env.DB_URI;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
