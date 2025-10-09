// src/admin/AdminSubmissions.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminSubmissions() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/submissions");
      setSubs(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch submissions");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.post(`/admin/submission-status/${id}`, { status });
      alert("Status updated");
      fetchSubs();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const viewSubmission = (s) => {
    // open link if present else show content
    if (s.link) window.open(s.link, "_blank");
    else alert(s.description || "No additional content");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Submissions</h2>

      {loading ? (
        <p>Loading submissions…</p>
      ) : (
        <div className="space-y-4">
          {subs.length === 0 && <p>No submissions found.</p>}
          {subs.map((s) => (
            <div key={s._id} className="p-4 bg-white rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <div className="text-sm text-gray-600">By: {s.userEmail || s.user?.email}</div>
                  <div className="text-sm text-gray-600">Dept: {s.department}</div>
                </div>
                <div className="space-x-2">
                  <button onClick={() => viewSubmission(s)} className="px-3 py-1 bg-indigo-600 text-white rounded">
                    View
                  </button>
                  <span className="px-3 py-1 bg-yellow-100 rounded">{s.status || "pending"}</span>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-700">{s.description?.slice(0, 300)}</p>

              <div className="mt-3 flex gap-2">
                <button onClick={() => updateStatus(s._id, "in-progress")} className="px-3 py-1 bg-blue-500 text-white rounded">
                  In progress
                </button>
                <button onClick={() => updateStatus(s._id, "completed")} className="px-3 py-1 bg-green-600 text-white rounded">
                  Mark complete
                </button>
                <button onClick={() => updateStatus(s._id, "rejected")} className="px-3 py-1 bg-red-600 text-white rounded">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
