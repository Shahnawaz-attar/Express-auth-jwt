const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      index : true
    },
    body: {
      type: String,
      required: true,
    },
    author :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true,
    }
});
module.exports = mongoose.model("Post", postSchema);
