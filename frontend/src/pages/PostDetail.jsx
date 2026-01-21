import React, { useEffect, useState } from "react";
import CommentSection from "../components/CommentSection";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { ArrowLeft, Calendar, User, Clock, Edit2, Trash2, Share2, Bookmark } from "lucide-react";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // 1. Cek User Login (buat nentuin tombol Edit/Delete muncul/nggak)
    const storedUser = localStorage.getItem("user");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));

    // 2. Ambil Detail Post
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setPost(data);
      } catch (error) {
        console.log(error);
        toast.error("Post not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  // Fungsi Delete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

    try {
      await API.delete(`/posts/${id}`);
      toast.success("Post deleted successfully");
      navigate("/"); // Balik ke Home
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete post");
    }
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  if (!post) return null;

  // Cek apakah user yang login adalah pemilik post ini?
  const isAuthor = currentUser && post.author && currentUser.id === post.author._id;
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* NAVBAR SIMPLE */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">
            <ArrowLeft size={20} /> <span className="hidden sm:inline">Back to Home</span>
          </button>
          <div className="font-bold text-xl tracking-tight">Talent Growth</div>
        </div>
      </nav>

      {/* --- MAIN LAYOUT (GRID SYSTEM) --- */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* === KOLOM KIRI: ARTIKEL UTAMA (2/3 Lebar) === */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">{post.category}</span>

            {/* Judul Besar */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-6 leading-tight">{post.title}</h1>

            {/* Author Info (Mobile Only - Biar gak ilang pas di HP) */}
            <div className="flex lg:hidden items-center gap-3 mb-8 pb-8 border-b border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                <User size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900">{post.author?.name}</p>
                <p className="text-sm text-gray-500">{new Date(post.createdAt).toDateString()}</p>
              </div>
            </div>

            {/* Gambar Utama (Placeholder Random Unsplash) */}
            <div className="w-full h-64 md:h-96 bg-gray-200 rounded-2xl overflow-hidden mb-10 shadow-sm">
              <img src={`https://source.unsplash.com/random/800x600?${post.category}`} alt="Article Cover" className="w-full h-full object-cover" />
            </div>

            {/* ISI ARTIKEL (HTML dari React Quill) */}
            {/* Class 'prose' & 'prose-lg' ini dari plugin typography yg baru kita install */}
            <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Tags di Bawah */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <CommentSection postId={post._id} />
          </div>

          {/* === KOLOM KANAN: SIDEBAR (1/3 Lebar) === */}
          <div className="space-y-8">
            {/* 1. ADMIN CONTROLS (Hanya Muncul Jika Author) */}
            {isAuthor && (
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-lg shadow-blue-50">
                <h3 className="text-sm font-bold text-gray-900 uppercase mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span> Admin Controls
                </h3>
                <div className="flex flex-col gap-3">
                  <button onClick={() => navigate(`/edit-post/${post._id}`)} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all">
                    <Edit2 size={18} /> Edit Post
                  </button>
                  <button onClick={handleDelete} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-red-600 hover:bg-red-50 py-3 rounded-xl font-bold transition-all">
                    <Trash2 size={18} /> Delete Post
                  </button>
                </div>
              </div>
            )}

            {/* 2. AUTHOR BIO CARD */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">About the Author</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">{post.author?.name.charAt(0).toUpperCase() || "?"}</div>
                <div>
                  <p className="font-bold text-lg text-gray-900">{post.author?.name}</p>
                  <p className="text-sm text-gray-500">{post.author?.email}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">Passionate writer and software engineer sharing insights about technology, leadership, and remote work culture.</p>
              <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm">View Profile</button>
            </div>

            {/* 3. POST METADATA */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar size={20} />
                  <span className="font-medium">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock size={20} />
                  <span className="font-medium">5 min read</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 rounded-lg text-gray-600 hover:text-blue-600 transition-colors">
                  <Share2 size={18} /> Share
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 rounded-lg text-gray-600 hover:text-blue-600 transition-colors">
                  <Bookmark size={18} /> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
