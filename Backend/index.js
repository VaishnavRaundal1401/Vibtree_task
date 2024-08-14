// Imports
const express = require("express");
const app = express();
const cors = require("cors");

// Local Imports
const connectDb = require("./Config/db");

// Routes Import
const profileRoutes = require("./Routes/profileRoutes");


// Middleware to parse JSON
app.use(express.json());
// Middleware to allow cross origin requests
app.use(cors());

// Adding Config File Contents to process
require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 8000;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

// Database Connection
connectDb(CONNECTION_STRING);

//Defining API's
app.use("/api/v1/user", profileRoutes);

app.get("/", (req, res) => {
  res.send("<h1>TESTING</h1>");
});

app.listen(PORT, () => {
  console.log(`backend listening on port ${PORT}`);
});