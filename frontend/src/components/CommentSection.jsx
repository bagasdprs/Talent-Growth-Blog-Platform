import React, { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { Trash2, Send, MessageCircle } from "lucide-react";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [currentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await API.get(`/posts/${postId}/comments`);
        setComments(data);
      } catch (error) {
        console.error("Gagal ambil komentar:", error);
      }
    };

    if (postId) fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await API.post(`/posts/${postId}/comments`, { content: newComment });
      setNewComment("");

      // Refresh manual setelah post berhasil
      const { data } = await API.get(`/posts/${postId}/comments`);
      setComments(data);

      toast.success("Comment added!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add comment. Login first?");
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete comment?")) return;
    try {
      await API.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
      toast.success("Comment deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="mt-12 pt-10 border-t border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MessageCircle size={24} /> Comments ({comments.length})
      </h3>

      {/* Form Input Komentar */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-8 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">{currentUser.name.charAt(0)}</div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a thoughtful comment..."
              className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none resize-none h-24"
            />
            <div className="flex justify-end mt-2">
              <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition-colors flex items-center gap-2">
                <Send size={16} /> Post Comment
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-gray-100 p-4 rounded-xl text-center mb-8">
          <p className="text-gray-600">
            Please{" "}
            <a href="/login" className="text-blue-700 font-bold underline">
              login
            </a>{" "}
            to leave a comment.
          </p>
        </div>
      )}

      {/* List Komentar */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 shrink-0">{comment.author?.name?.charAt(0) || "?"}</div>
            <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold text-gray-900 mr-2">{comment.author?.name}</span>
                  <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                {/* Tombol Delete cuma buat yang punya komen */}
                {currentUser && currentUser.id === comment.author?._id && (
                  <button onClick={() => handleDelete(comment._id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
