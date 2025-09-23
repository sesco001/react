import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h1 className="text-xl font-bold text-indigo-600">Assignment Hub</h1>
          <button onClick={() => setIsOpen(false)} className="text-gray-700">
            Close ✖
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          <Link
            to="/categories"
            className="text-gray-700 hover:text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Categories
          </Link>
          <a
            href={`${process.env.REACT_APP_HUMANISER_URL || "https://humaniser-11.vercel.app/"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Humaniser
          </a>
          <Link
            to="/submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded text-center"
            onClick={() => setIsOpen(false)}
          >
            Submit Assignment
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700">
                Hi, {user?.name || user?.email}
              </span>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-sm text-red-600 text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Top bar with hamburger (text instead of icon) */}
      <div className="w-full bg-white shadow-sm px-4 py-4 flex items-center justify-between">
        <button onClick={() => setIsOpen(true)} className="text-gray-700">
          Menu ☰
        </button>
        <h1 className="text-lg font-bold text-indigo-600">Assignment Hub</h1>
      </div>
    </div>
  );
}
