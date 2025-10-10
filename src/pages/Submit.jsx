
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../api";
import { io } from "socket.io-client";

// Connect to backend Socket.IO server
const socket = io("https://your-backend-url.com"); // replace with your backend URL

export default function Submit() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("engineering");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Block access if not logged in
  if (!token) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded shadow text-center">
        <p className="mb-2">⚠️ You must be logged in to submit an assignment.</p>
        <Link
          to="/login"
          className="inline-block mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Login
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Open the working submission form first
      const submissionWindow = window.open(
        "https://submission12.netlify.app/",
        "_blank"
      );

      // Prepare form data
      const form = new FormData();
      form.append("title", title);
      form.append("department", department);
      form.append("description", description);
      if (file) form.append("file", file);

      // Send submission to backend
      const res = await api.post("/assignments/submit", form, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      // Notify admin in real-time
      socket.emit("new_submission", {
        title,
        user: token, // or user name
        timestamp: new Date(),
      });

      // Show toast to user
      toast.success(res.data.message || "Assignment submitted successfully!");

      // After a short delay, redirect original window back home
      setTimeout(() => {
        navigate("/");
      }, 1500);

      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("❌ Submission failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-xl font-semibold mb-4">📤 Submit Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border p-2 rounded focus:ring focus:ring-indigo-200"
          >
            <option value="engineering">Engineering</option>
            <option value="business">Business</option>
            <option value="arts">Arts</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded focus:ring focus:ring-indigo-200"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">File (optional)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Assignment"}
          </button>
        </div>
      </form>
    </div>
  );
}
