import { useEffect, useState } from "react";

// ✅ Smart fallback: works in both CRA and Vite, or even plain builds
const API_BASE =
  (import.meta?.env?.VITE_API_URL ??
    process?.env?.REACT_APP_BACKEND_URL ??
    "https://bava.onrender.com/api");

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch(`${API_BASE}/submissions`);
        const data = await res.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  if (loading) return <p>Loading submissions...</p>;

  return (
    <section className="p-6 bg-white rounded-lg shadow space-y-3">
      <h2 className="text-2xl font-semibold">Admin Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <ul className="space-y-2">
          {submissions.map((submission, index) => (
            <li key={index} className="border p-3 rounded-md">
              <p><strong>Name:</strong> {submission.name}</p>
              <p><strong>Email:</strong> {submission.email}</p>
              <p><strong>Message:</strong> {submission.message}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

