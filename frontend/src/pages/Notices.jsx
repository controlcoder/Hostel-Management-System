import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../api/axios.api";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import toast from "react-hot-toast";

export default function Notices() {
  const { user } = useContext(AuthContext);
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });

  const fetchNotices = async () => {
    try {
      const { data } = await api.get("/api/notices");
      setNotices(data.notices || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/notices", form);
      if (data.success) {
        toast.success("Notice posted!");
        setShowModal(false);
        setForm({ title: "", content: "" });
        fetchNotices();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post notice");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await api.delete(`/api/notices/${id}`);
      if (data.success) {
        toast.success("Notice deleted");
        fetchNotices();
      }
    } catch (err) {
      toast.error("Failed to delete notice");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0e1a] text-white">
      <Navbar />

      <div className="pt-24 px-6 max-w-4xl mx-auto pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">📢 Notices</h1>
            <p className="text-gray-400 text-sm">
              Stay updated with hostel announcements
            </p>
          </div>

          {user?.role === "admin" && (
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold text-sm hover:opacity-90 transition cursor-pointer"
            >
              + Post Notice
            </button>
          )}
        </div>

        {/* Notices List */}
        {notices.length > 0 ? (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {notice.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                      {notice.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-3">
                      Posted by {notice.postedBy?.name || "Admin"} •{" "}
                      {new Date(notice.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDelete(notice._id)}
                      className="text-red-400 hover:text-red-300 text-sm ml-4 cursor-pointer"
                    >
                      🗑
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-4xl mb-4">📭</p>
            <p>No notices posted yet.</p>
          </div>
        )}
      </div>

      {/* Create Notice Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Post a Notice"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="text"
            placeholder="Notice Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
            required
          />
          <textarea
            placeholder="Notice content..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={4}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400 resize-none"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition cursor-pointer"
          >
            Post Notice
          </button>
        </form>
      </Modal>
    </div>
  );
}
