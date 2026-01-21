const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

// 1. Add Comment
router.post("/posts/:id/comments", authMiddleware, commentController.addComment);

// 2. Get Comments
router.get("/posts/:id/comments", commentController.getCommentsByPost);

// 3. Delete Comment
router.delete("/comments/:id", authMiddleware, commentController.deleteComment);

module.exports = router;
