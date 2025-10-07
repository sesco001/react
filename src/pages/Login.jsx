import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user && user.token) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/signin", {
        email: email.trim(),
        password: password.trim(),
      });

      if (!data || !data.token) throw new Error("Invalid login response");

      // Save full user object (including token + role)
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "❌ Login failed, please try again.";
      alert(msg);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          disabled={loading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "🔑 Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
