import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
  console.log("c",code);
  
    if (code) {
     const r =   API.post("/auth/github", { code })
        .then((res) => {
          console.log(r);
          
          localStorage.setItem("jwt", res.data.token);
          navigate("/select-repo");
        })
        .catch((err) => {
          console.error(err);
          alert("GitHub login failed");
        });
    }
  }, [navigate]);

  return <div>Logging in...</div>;
}
