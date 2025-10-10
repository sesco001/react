import { useEffect, useState } from "react";

// ✅ Universal API base: works in both CRA and Vite, with a safe fallback
const API_BASE =
  import.meta?.env?.VITE_API_URL ??
  process?.env?.REACT_APP_BACKEND_URL ??
  "https://bava.onrender.com/api";

export default function AdminAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch(`${API_BASE}/assignments`);
        if (!res.ok) throw new Error("Failed to fetch assignments");
        const data = await res.json();
        setAssignments(data);
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading)
    return (
      <section className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold">📘 Admin Assignments</h2>
        <p className="text-gray-600 mt-2">Loading assignments...</p>
      </section>
    );

  if (error)
    return (
      <section className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold">📘 Admin Assignments</h2>
        <p className="text-red-500 mt-2">Error: {error}</p>
      </section>
    );

  return (
    <section className="p-6 bg-white rounded-lg shadow space-y-3">
      <h2 className="text-2xl font-semibold">📘 Admin Assignments</h2>

      {assignments.length === 0 ? (
        <p className="text-gray-600">No assignments found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{assignment.title}</h3>
              <p className="text-gray-600 text-sm mt-1">
                {assignment.description}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                <strong>Due:</strong>{" "}
                {new Date(assignment.dueDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

