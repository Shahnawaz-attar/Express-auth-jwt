const Post = require("../models/postModel");
const { validationResult } = require("express-validator");

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author");
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(201).json({ error: errors.message });
    }

    const post = new Post({ ...req.body, author: req.userId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.delete();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
        // Update the post with the new data
        const updatedFields = {};
        if (req.body.title) {
          updatedFields.title = req.body.title;
        }
        if (req.body.body) {
          updatedFields.body = req.body.body;
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id , {$set : updatedFields},{new :true})
        res.json(updatedPost);

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
