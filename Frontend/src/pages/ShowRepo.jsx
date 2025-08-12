
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Tumnail from "../assets/images/Tumnail.svg";
import Loader from "../components/Loading";
import toast from "react-hot-toast";
import { FaGithubAlt } from "react-icons/fa";

export default function SelectRepo() {
  const [repos, setRepos] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await API.get("/repos");
        console.log(response);
        
        setRepos(response?.data || []);
        if (response?.status === 200) {
          toast.success("Getting All Repositories Successfully");
        }
      } catch (err) {
        toast.error("Failed to get Repositories");
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const handleSelectRepo = (repoFullName) => {
    localStorage.setItem("selectedRepo", repoFullName);
    navigate("/select-files");
  };

  

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: `url(${Tumnail})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

       <button
            onClick={() => navigate("/")}
            className="px-6 py-3 absolute top-4 sm:top-8 mb-8 left-5 cursor-pointer rounded-lg font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.8)] transition-all duration-300"
          >
            🡸 Back
          </button>
      {/* Glassy overlay */}
      <div className="backdrop-blur-md bg-black/20 rounded-2xl p-6 w-full md:px-20 pb-10 max-w-7xl shadow-lg border border-white/10">
      <div className="p flex justify-center items-center gap-4">
      <FaGithubAlt className="text-5xl text-[#a855f7] font-bold text-center mb-10 tracking-wide animate-pulse"/>
        <h2
          className="text-4xl font-bold text-center mb-10 tracking-wide animate-pulse"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            background: "linear-gradient(90deg, #a855f7, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow:
              "0 0 15px rgba(168,85,247,0.7), 0 0 30px rgba(99,102,241,0.5)",
          }}
        >
         Select a GitHub Repository
    
        </h2>
        </div>

        
        {/* Scrollable repo list */}
        <div className="max-h-[65vh] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {loading ? <Loader/> : (
          repos.length > 0 ? (
            repos.map((repo) => (
              <div
                key={repo.id}
                className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-violet-500/40 
                           hover:border-violet-400 hover:shadow-[0_0_15px_rgba(139,92,246,0.7)] 
                           transition-all cursor-pointer duration-300 "
              >
                <button
                  onClick={() => handleSelectRepo(repo?.full_name)}
                 style={{ fontFamily: "'Roboto', sans-serif" }}
                  className="w-full cursor-pointer text-left text-lg font-medium text-white tracking-wide"
                >
                  {repo.name}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-white/80 mt-10 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-violet-500/40">
              <p className="text-lg font-semibold">⚠ No repositories found</p>
              <p className="text-sm text-white/60 mt-1">
                Please connect your GitHub account or try again.
              </p>
            </div>
          )
           )}
        </div>
        
      </div>
     

      {/* Custom scrollbar styling */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(139, 92, 246, 0.6);
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(139, 92, 246, 0.8);
          }
        `}
      </style>
    </div>
  );
}
