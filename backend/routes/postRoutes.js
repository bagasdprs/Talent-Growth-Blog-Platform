const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// POST /posts
router.post("/", authMiddleware, postController.createPost);

// GET /posts
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.put("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
router.post("/", authMiddleware, upload.single("image"), postController.createPost);

module.exports = router;
