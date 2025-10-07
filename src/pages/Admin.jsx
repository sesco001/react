import React, { useEffect, useState } from "react";
import api from "../api";

export default function Admin() {
  const [subs, setSubs] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignForm, setAssignForm] = useState({
    userId: "",
    type: "local", // local | international
    title: "",
    content: "",
    link: "",
  });

  useEffect(() => {
    // fetch submissions
    api.get("/admin/submissions")
      .then((res) => setSubs(res.data || []))
      .catch(() => setSubs([]));

    // fetch all users for assignment posting
    api.get("/admin/users")
      .then((res) => setUsers(res.data || []))
      .catch(() => setUsers([]));
  }, []);

  const handleAssignChange = (e) => {
    setAssignForm({ ...assignForm, [e.target.name]: e.target.value });
  };

  const handlePostAssignment = async () => {
    try {
      await api.post("/admin/assignments", assignForm);
      alert("Assignment posted successfully ✅");
      setAssignForm({ userId: "", type: "local", title: "", content: "", link: "" });
    } catch (err) {
      alert("Failed to post assignment ❌");
    }
  };

  const handlePaymentVerify = async (userId) => {
    try {
      await api.post(`/admin/verify-payment/${userId}`);
      alert("Payment verified ✅");
      refreshUsers();
    } catch (err) {
      alert("Failed to verify payment ❌");
    }
  };

  const handleSuspendUser = async (userId) => {
    try {
      await api.post(`/admin/suspend-user/${userId}`);
      alert("User suspended ✅");
      refreshUsers();
    } catch (err) {
      alert("Failed to suspend user ❌");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? ❌")) return;
    try {
      await api.delete(`/admin/delete-user/${userId}`);
      alert("User deleted ✅");
      refreshUsers();
    } catch (err) {
      alert("Failed to delete user ❌");
    }
  };

  const refreshUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data || []);
    } catch {
      setUsers([]);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Manage Submissions */}
      <section>
        <h2 className="text-xl font-semibold mb-3">User Submissions</h2>
        <div className="space-y-4">
          {subs.map((s) => (
            <div key={s._id} className="p-4 bg-white rounded shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-gray-600">
                    Dept: {s.department} — By: {s.userEmail}
                  </p>
                </div>
                <div>
                  <span className="px-3 py-1 bg-yellow-100 rounded">
                    {s.status}
                  </span>
                </div>
              </div>
              <p className="mt-2">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Post Assignments */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Post Assignment</h2>
        <div className="p-4 bg-white rounded shadow space-y-3">
          <select
            name="userId"
            value={assignForm.userId}
            onChange={handleAssignChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name || u.email}
              </option>
            ))}
          </select>
          <select
            name="type"
            value={assignForm.type}
            onChange={handleAssignChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="local">Local</option>
            <option value="international">International</option>
          </select>
          <input
            name="title"
            value={assignForm.title}
            onChange={handleAssignChange}
            placeholder="Assignment Title"
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="content"
            value={assignForm.content}
            onChange={handleAssignChange}
            placeholder="Assignment Content (or leave empty if using link)"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="link"
            value={assignForm.link}
            onChange={handleAssignChange}
            placeholder="Optional Assignment Link"
            className="w-full border px-3 py-2 rounded"
          />
          <button
            onClick={handlePostAssignment}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Post Assignment
          </button>
        </div>
      </section>

      {/* Control Payments */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Payment Control</h2>
        <div className="space-y-3">
          {users.map((u) => (
            <div key={u._id} className="flex justify-between items-center p-3 bg-white rounded shadow">
              <span>{u.name || u.email}</span>
              <span>
                {u.isVerified ? (
                  <span className="px-2 py-1 bg-green-100 rounded">Verified</span>
                ) : (
                  <button
                    onClick={() => handlePaymentVerify(u._id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Verify Payment
                  </button>
                )}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 Master Controls */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-red-600">Master Controls</h2>
        <div className="space-y-3">
          {users.map((u) => (
            <div key={u._id} className="flex justify-between items-center p-3 bg-white rounded shadow">
              <span>{u.name || u.email}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleSuspendUser(u._id)}
                  className="px-3 py-1 bg-orange-500 text-white rounded"
                >
                  Suspend
                </button>
                <button
                  onClick={() => handleDeleteUser(u._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

