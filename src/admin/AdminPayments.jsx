// src/admin/AdminPayments.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminPayments() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const verifyPayment = async (userId) => {
    if (!window.confirm("Mark payment as verified for this user?")) return;
    try {
      await api.post(`/admin/verify-payment/${userId}`);
      alert("Payment verified");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to verify payment");
    }
  };

  const revokeVerification = async (userId) => {
    if (!window.confirm("Revoke payment verification for this user?")) return;
    try {
      await api.post(`/admin/revoke-payment/${userId}`);
      alert("Verification revoked");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to revoke verification");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payments & Verifications</h2>

      {loading ? (
        <p>Loading users…</p>
      ) : (
        <div className="space-y-3">
          {users.length === 0 && <p>No users found.</p>}
          {users.map((u) => (
            <div key={u._id} className="flex items-center justify-between p-3 bg-white rounded shadow">
              <div>
                <div className="font-semibold">{u.name || u.email}</div>
                <div className="text-sm text-gray-600">Balance: {u.balance ?? 0}</div>
              </div>
              <div className="flex items-center gap-2">
                {u.isVerified ? (
                  <button
                    onClick={() => revokeVerification(u._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Revoke
                  </button>
                ) : (
                  <button
                    onClick={() => verifyPayment(u._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Verify Payment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
