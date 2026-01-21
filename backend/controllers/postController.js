const Post = require("../models/Post");

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    let imagePath = null;
    if (req.file) {
      imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const newPost = await Post.create({
      title,
      content,
      category,
      tags,
      image: imagePath,
      author: req.user.id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL POSTS
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email").sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET POST BY ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name email");

    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  try {
    // Check if post exists
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Cek Authorization
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    // Update data
    post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE POST
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Cek Authorization
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
