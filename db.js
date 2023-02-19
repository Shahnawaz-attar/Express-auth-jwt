const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.MONGO_URI;
mongoose.set("strictQuery", false);

if (!uri) {
  console.error("MONGO_URI environment variable is not set.");
  process.exit(1); // exit the process if MONGO_URI is not set
}

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => console.log(err));
