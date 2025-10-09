// src/admin/AdminUpdates.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminUpdates() {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });

  const fetchNews = async () => {
    try {
      const res = await api.get("/admin/news");
      setNews(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch updates");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handlePost = async () => {
    if (!form.title || !form.body) {
      alert("Title and body required");
      return;
    }
    try {
      await api.post("/admin/post-news", form);
      setForm({ title: "", body: "" });
      fetchNews();
      alert("Posted update");
    } catch (err) {
      console.error(err);
      alert("Failed to post");
    }
  };

  const deleteNews = async (id) => {
    if (!window.confirm("Delete update?")) return;
    try {
      await api.delete(`/admin/news/${id}`);
      fetchNews();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">News & Updates</h2>

      <div className="p-4 bg-white rounded shadow mb-6">
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Headline" className="w-full border p-2 rounded mb-2" />
        <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Write your update..." rows="4" className="w-full border p-2 rounded mb-2" />
        <div className="flex gap-2">
          <button onClick={handlePost} className="px-4 py-2 bg-indigo-600 text-white rounded">Post Update</button>
        </div>
      </div>

      <div className="space-y-3">
        {news.length === 0 && <p>No updates yet.</p>}
        {news.map((n) => (
          <div key={n._id} className="p-3 bg-white rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{n.title}</div>
                <div className="text-sm text-gray-600">{new Date(n.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => deleteNews(n._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
            <p className="mt-2 text-sm">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
