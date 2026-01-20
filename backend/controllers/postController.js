const Post = require("../models/Post");

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    const newPost = await Post.create({
      title,
      content,
      category,
      tags,
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

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. UPDATE POST (Simpan perubahan)
exports.updatePost = async (req, res) => {
  try {
    // Cari post dulu
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Cek: Apakah yang mau edit adalah pemilik post?
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
