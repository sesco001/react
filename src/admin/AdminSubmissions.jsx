import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "https://bava.onrender.com/api";

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        console.log("Fetching:", `${API_BASE}/admin/submissions`);
        const res = await fetch(`${API_BASE}/admin/submissions`);
        if (!res.ok) throw new Error("Failed to fetch submissions");
        const data = await res.json();
        setSubmissions(data);
      } catch (err) {
        console.error("❌ Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  if (loading) return <p>Loading submissions...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">📤 Student Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">User Email</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s._id} className="border-t">
                <td className="p-2">{s.userEmail}</td>
                <td className="p-2">{s.title}</td>
                <td className="p-2 capitalize">{s.status}</td>
                <td className="p-2">{new Date(s.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

