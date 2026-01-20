import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Loader2, Search, User } from "lucide-react";
import toast from "react-hot-toast";

function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchPosts = async () => {
      try {
        const { data } = await API.get("/posts");
        setPosts(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">T</div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Talent Growth</span>
          </div>

          {/* Menu Kanan */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button onClick={() => navigate("/create-post")} className="hidden md:block text-gray-600 hover:text-blue-700 font-medium transition-colors">
                  Write a Post
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <button onClick={() => navigate("/profile")} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">{user.name.charAt(0).toUpperCase()}</div>
                    <span className="font-medium text-sm text-gray-700 hidden md:block">{user.name}</span>
                  </button>
                  <button onClick={handleLogout} className="text-sm text-red-500 font-medium hover:underline">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              // Kalau BELUM Login: Tampilkan tombol Login
              <button onClick={() => navigate("/login")} className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-full font-medium transition-all">
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (Optional - Biar cantik) --- */}
      <div className="bg-blue-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Insightful Stories</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">Read stories from writers on technology, leadership, and personal growth.</p>
      </div>

      {/* --- CONTENT FEED --- */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input type="text" placeholder="Search topics..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-100 outline-none w-64" />
          </div>
        </div>

        <div className="grid gap-6">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No posts available yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row gap-6 group cursor-pointer">
                {/* Thumbnail */}
                <div className="w-full md:w-48 h-48 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  <img src={`https://source.unsplash.com/random/400x300?${post.category}`} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">{post.category}</span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-500 text-xs font-medium">{new Date(post.createdAt).toDateString()}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">{post.title}</h3>

                  {/* Convert HTML content to plain text preview (limit 150 chars) */}
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.content.replace(/<[^>]+>/g, "")}</p>

                  {/* Author Info */}
                  <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-50">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <User size={14} className="text-gray-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">{post.author ? post.author.name : "Unknown Writer"}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
