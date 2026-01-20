import React, { useEffect, useState } from "react";
import { Edit2, Trash2, Plus, CheckCircle, Calendar, Clock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil Data User & Posts saat halaman dibuka
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Ambil data User dari LocalStorage (yang disimpen pas Login)
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
          navigate("/login");
          return;
        }
        setUser(storedUser);

        // 2. Ambil Postingan dari Backend
        const { data } = await API.get("/posts");
        // Filter: Hanya tampilkan post milik user yang sedang login
        const userPosts = data.filter((post) => post.author._id === storedUser.id);
        setMyPosts(userPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Gagal mengambil data profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Fungsi Delete Post
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      setMyPosts(myPosts.filter((p) => p._id !== postId));
      toast.success("Post deleted!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-700" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">T</div>
          <span className="font-bold text-xl tracking-tight">Talent Growth Blog</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => navigate("/create-post")} className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-200 active:scale-95">
            <Plus size={18} />
            Create Post
          </button>
          {/* Avatar Inisial */}
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold border border-blue-200">{user?.name?.charAt(0).toUpperCase()}</div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm">
          <div className="w-32 h-32 rounded-full bg-linear-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-md">{user?.name?.charAt(0).toUpperCase()}</div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{user?.name}</h1>
            <p className="text-gray-500 font-medium mb-4">{user?.email}</p>
            <p className="text-gray-600 max-w-lg">Software Engineer passionate about React, Node.js, and building scalable web applications.</p>
          </div>
        </div>

        {/* My Posts Section */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Posts</h2>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">{myPosts.length}</span>
          </div>

          {myPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">You haven't posted anything yet.</p>
              <button onClick={() => navigate("/create-post")} className="text-blue-700 font-bold mt-2 hover:underline">
                Start Writing
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myPosts.map((post) => (
                <div key={post._id} className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-shadow">
                  {/* Thumbnail Random (Biar gak kosong) */}
                  <div className="w-full md:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img src={`https://source.unsplash.com/random/200x200?${post.category}`} alt="Thumbnail" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 w-full text-center md:text-left">
                    <div className="mb-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">{post.category || "General"}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button onClick={() => navigate(`/edit-post/${post._id}`)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(post._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
