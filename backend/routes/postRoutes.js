const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /posts
router.post("/", authMiddleware, postController.createPost);

// GET /posts
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.put("/:id", authMiddleware, postController.updatePost);

module.exports = router;
