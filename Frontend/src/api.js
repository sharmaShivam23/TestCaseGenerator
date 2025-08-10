

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

// Attach JWT from localStorage for all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("tokens");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
