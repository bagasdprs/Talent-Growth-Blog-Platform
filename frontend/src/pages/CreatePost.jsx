import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import { ArrowLeft, Loader2 } from "lucide-react";

function CreatePost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State Form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !content) {
      return toast.error("Title and Content are required!");
    }

    setLoading(true);

    try {
      // Logic Tags:
      const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];

      // (JSON Object)
      const postData = {
        title,
        content,
        category: category || "General",
        tags: tagsArray,
      };

      // Send to Backend
      await API.post("/posts", postData);

      toast.success("Post published successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to publish post.");
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!title || !content) {
  //     return toast.error("Title and Content are required!");
  //   }

  //   setLoading(true);
  //   try {
  //     // Convert tags string "react, node" -> array ["react", "node"]
  //     const tagsArray = tags.split(",").map((tag) => tag.trim());

  //     const postData = {
  //       title,
  //       content,
  //       category: category || "General",
  //       tags: tagsArray,
  //     };

  //     // Send to Backend
  //     await API.post("/posts", postData);

  //     toast.success("Post published successfully!");
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to publish post.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Navbar Simple */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl text-gray-800">
            <span className="bg-blue-700 text-white w-8 h-8 flex items-center justify-center rounded-lg">T</span>
            Talent Growth
          </div>
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-900 text-sm font-medium">
            Cancel
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 mt-8">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 mb-6 hover:underline">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          {/* 1. Post Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Post Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., 5 Strategies for Career Growth..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-lg font-medium placeholder:font-normal"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* 2. Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all bg-white">
                <option value="">Select a category</option>
                <option value="Leadership">Leadership</option>
                <option value="Technology">Technology</option>
                <option value="Productivity">Productivity</option>
                <option value="Remote Work">Remote Work</option>
              </select>
            </div>

            {/* 3. Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Add tags separated by commas"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
              />
            </div>
          </div>

          {/* 4. Content Editor  */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
            <div className="prose-editor">
              <ReactQuill theme="snow" value={content} onChange={setContent} placeholder="Share your insights here..." className="h-64 mb-12" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-4 pt-6 border-t border-gray-100 mt-10">
            <button type="button" className="px-6 py-3 rounded-xl border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition-all">
              Save Draft
            </button>
            <button type="submit" disabled={loading} className="px-8 py-3 rounded-xl bg-blue-700 text-white font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-200 active:scale-95 flex items-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
