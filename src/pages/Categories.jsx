import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Categories() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // try to fetch departments from backend; fallback to static
    api.get("/departments").then((res) => {
      setDepartments(res.data || [
        { id: "engineering", name: "Engineering" },
        { id: "business", name: "Business & Economics" },
        { id: "arts", name: "Arts & Social Sciences" }
      ]);
    }).catch(() => {
      setDepartments([
        { id: "engineering", name: "Engineering" },
        { id: "business", name: "Business & Economics" },
        { id: "arts", name: "Arts & Social Sciences" }
      ]);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Departments</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map((d) => (
          <Link to={`/category/${d.id}`} key={d.id}>
            <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">{d.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
