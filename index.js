const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const session = require("express-session");

dotenv.config();
require("./db");

// Enable cross-origin resource sharing
app.use(cors());

// express session
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);
app.use(cache({ maxAge: 300 }));

// Enable JSON parsing for request bodies
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));// when data sent by encoded form

app.use(express.json()); // when data send raw json

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));

app.post('/bodParserExample', (req, res) => {
  console.log(req.body);
  res.send('Post received');
});



const port = process.env.port || 3000;
app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is running on port:" + port);
  }
});
