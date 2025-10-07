import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  const handleEarnClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // require login
    } else {
      navigate("/earn");
    }
  };

  const categories = [
    {
      id: "learn",
      name: "📚 Learn",
      description:
        "Access unlimited AI-powered academic resources, Humaniser, No Limit AI, and department-based study materials.",
    },
    {
      id: "earn",
      name: "💸 Earn",
      description:
        "Get paid for solving assignments (local & international) and earn referral bonuses when you invite others.",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Choose Your Category</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((c) =>
          c.id === "earn" ? (
            <div
              key={c.id}
              onClick={handleEarnClick}
              className="p-6 bg-white rounded shadow hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{c.name}</h3>
              <p className="text-gray-700">{c.description}</p>
            </div>
          ) : (
            <Link to={`/${c.id}`} key={c.id}>
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{c.name}</h3>
                <p className="text-gray-700">{c.description}</p>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
