import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import { ArrowLeft, Loader2 } from "lucide-react";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State Form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setTags(data.tags.join(", "));
      } catch (error) {
        console.log(error);
        toast.error("Failed to load post data");
        navigate("/profile");
      }
    };
    fetchPost();
  }, [id, navigate]);

  // 2. Simpan Perubahan
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagsArray = tags.split(",").map((tag) => tag.trim());
      const postData = { title, content, category, tags: tagsArray };

      await API.put(`/posts/${id}`, postData);

      toast.success("Post updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="font-bold text-xl text-gray-800">Edit Post</div>
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-900 font-medium">
            Cancel
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 mt-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 mb-6 hover:underline">
          <ArrowLeft size={16} /> Back
        </button>

        <form onSubmit={handleUpdate} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Post Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-50 transition-all text-lg font-medium" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white">
                <option value="">Select category</option>
                <option value="Leadership">Leadership</option>
                <option value="Technology">Technology</option>
                <option value="Productivity">Productivity</option>
                <option value="Remote Work">Remote Work</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
              <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200" />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
            <div className="prose-editor">
              <ReactQuill theme="snow" value={content} onChange={setContent} className="h-64 mb-12" />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100 mt-10">
            <button type="submit" disabled={loading} className="px-8 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200 flex items-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
