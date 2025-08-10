import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Attach JWT from localStorage for all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("tokens");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
