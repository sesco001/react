// src/admin/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });

  const fetchUsers = async () => {
    const { data } = await api.get("/admin/users");
    setUsers(data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddUser = async () => {
    await api.post("/admin/add-user", form);
    setForm({ name: "", email: "", password: "", role: "student" });
    fetchUsers();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="p-4 bg-white rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Add New User</h3>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 mr-2 rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 mr-2 rounded"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="border p-2 mr-2 rounded"
          type="password"
        />
        <select name="role" value={form.role} onChange={handleChange} className="border p-2 mr-2 rounded">
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleAddUser} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <table className="w-full border-collapse bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Verified</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">{u.isVerified ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
