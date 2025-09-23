import React, { useEffect, useState } from "react";
import api from "../api";

export default function Admin() {
  const [subs, setSubs] = useState([]);
  useEffect(() => {
    api.get("/admin/submissions").then((res) => setSubs(res.data || [])).catch(() => setSubs([]));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="space-y-4">
        {subs.map((s) => (
          <div key={s._id} className="p-4 bg-white rounded shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-gray-600">Dept: {s.department} — By: {s.userEmail}</p>
              </div>
              <div>
                <span className="px-3 py-1 bg-yellow-100 rounded">{s.status}</span>
              </div>
            </div>
            <p className="mt-2">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
