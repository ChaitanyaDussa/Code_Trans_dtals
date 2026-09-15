import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const apiBaseUrl = configuredApiUrl.replace(/\/+$/, "").endsWith("/api")
  ? configuredApiUrl.replace(/\/+$/, "")
  : `${configuredApiUrl.replace(/\/+$/, "")}/api`;

const API = axios.create({
  baseURL: apiBaseUrl,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
