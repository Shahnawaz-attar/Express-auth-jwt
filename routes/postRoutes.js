const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const { check } = require('express-validator');

// Get all posts
router.get("/", postController.getPosts);

// Create a new post
router.post("/", authMiddleware.verifyToken,[
    check('title').isEmpty().withMessage("Title is important")
], postController.createPost);


// delete 
router.delete('/:id',postController.deletePost);

// update 
router.put('/:id',postController.updatePost)

module.exports = router;
