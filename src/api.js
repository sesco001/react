import axios from "axios";

const BASE = process.env.REACT_APP_BACKEND_URL || "";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" }
});

// Attach token if present
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
