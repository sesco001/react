import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Navigation items for easy reuse
  const navItems = [
    { path: "/admin/users", label: "👤 Users" },
    { path: "/admin/payments", label: "💳 Payments" },
    { path: "/admin/submissions", label: "📄 Submissions" },
    { path: "/admin/assignments", label: "📝 Assignments" },
    { path: "/admin/updates", label: "📰 Updates" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6 text-center tracking-wide">
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded transition-colors ${
                location.pathname === item.path
                  ? "bg-indigo-900 font-semibold"
                  : "hover:bg-indigo-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-auto bg-red-500 hover:bg-red-600 px-3 py-2 rounded transition"
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
