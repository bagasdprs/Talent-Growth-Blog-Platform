require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Simple Route for Testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
