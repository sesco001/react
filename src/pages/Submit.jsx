import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Submit() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("engineering");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="p-6 bg-white rounded shadow">
        <p>Please <a className="text-indigo-600" href="/login">login</a> to submit an assignment.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("department", department);
      form.append("description", description);
      if (file) form.append("file", file);

      const res = await api.post("/submit", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert(res.data.message || "Submitted!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Submit Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Department</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full border p-2 rounded">
            <option value="engineering">Engineering</option>
            <option value="business">Business</option>
            <option value="arts">Arts</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">File (optional)</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? "Submitting..." : "Submit Assignment"}
          </button>
        </div>
      </form>
    </div>
  );
}
