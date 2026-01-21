const Comment = require("../models/Comment");
const Post = require("../models/Post");

// 1. ADD COMMENT (POST /posts/:id/comments)
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;

    // Check post is exist?
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const newComment = await Comment.create({
      content,
      post: postId,
      author: req.user.id,
    });

    // Populate author field
    await newComment.populate("author", "name email");

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. GET COMMENTS BY POST
exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id }).populate("author", "name email").sort({ createdAt: -1 }); // Paling baru di atas
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. DELETE COMMENT
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    // Check if the user is the author of the comment
    if (comment.author.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
