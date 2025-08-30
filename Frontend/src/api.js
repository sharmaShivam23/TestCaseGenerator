

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

// Response interceptor for better error handling
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem("tokens");
      // Optionally redirect to login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    
    // Log error for debugging
    console.error("API Error:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url
    });
    
    return Promise.reject(error);
  }
);

export default API;
