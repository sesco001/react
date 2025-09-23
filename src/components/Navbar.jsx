import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    setOpen(false);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-indigo-700 text-white transform ${
          open ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 ease-in-out md:translate-x-0 z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b border-indigo-600">
          <h1 className="text-xl font-bold">Assignment Hub</h1>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-white"
          >
            <FaTimes size={22} />
          </button>
        </div>

        <nav className="mt-6 flex flex-col space-y-4 px-6">
          <Link to="/" className="hover:text-gray-200" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/categories" className="hover:text-gray-200" onClick={() => setOpen(false)}>
            Categories
          </Link>
          <a
            href={`${process.env.REACT_APP_HUMANISER_URL || "/"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200"
            onClick={() => setOpen(false)}
          >
            Humaniser
          </a>
          <Link to="/submit" className="hover:text-gray-200" onClick={() => setOpen(false)}>
            Submit Assignment
          </Link>

          {!token ? (
            <>
              <Link to="/login" className="hover:text-gray-200" onClick={() => setOpen(false)}>
                Log in
              </Link>
              <Link to="/signup" className="hover:text-gray-200" onClick={() => setOpen(false)}>
                Sign up
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-200">
                Hi, {user?.name || user?.email}
              </span>
              {user?.role === "admin" && (
                <Link to="/admin" className="hover:text-gray-200" onClick={() => setOpen(false)}>
                  Admin
                </Link>
              )}
              <button onClick={logout} className="text-sm text-red-300">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Top bar for mobile */}
      <header className="md:hidden flex items-center justify-between w-full bg-white shadow px-4 py-3">
        <h2 className="text-lg font-bold text-indigo-600">Assignment Hub</h2>
        <button onClick={() => setOpen(true)} className="text-indigo-600">
          <FaBars size={22} />
        </button>
      </header>
    </div>
  );
}

