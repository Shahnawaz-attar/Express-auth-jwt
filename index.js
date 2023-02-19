const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
require("./db");

// Enable cross-origin resource sharing
app.use(cors());

// Enable JSON parsing for request bodies
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

const port = process.env.port || 3000;
app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is running on port:" + port);
  }
});
