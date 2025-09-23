import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            Assignment Hub
          </Link>
          <Link to="/categories" className="text-gray-600 hover:text-indigo-600">
            Categories
          </Link>
          <a
            href={`${process.env.REACT_APP_HUMANISER_URL || "/"} `}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-600"
          >
            Humaniser
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
            Submit Assignment
          </Link>

          {!token ? (
            <>
              <Link to="/login" className="text-gray-700">
                Log in
              </Link>
              <Link to="/signup" className="text-gray-700">
                Sign up
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700">Hi, {user?.name || user?.email}</span>
              {user?.role === "admin" && (
                <Link to="/admin" className="text-gray-700">
                  Admin
                </Link>
              )}
              <button onClick={logout} className="text-sm text-red-600">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
