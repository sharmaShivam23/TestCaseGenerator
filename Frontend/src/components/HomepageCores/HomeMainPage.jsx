
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import stars from "../../assets/images/stars.svg";
import robot from "../../assets/images/robot.svg";
import VioletBtn from "../common/VioletBtn";

const HomeMainPage = () => {
  const navigate = useNavigate();

  const handleScroll = () => {
    const nextSection = document.getElementById("Home");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handleLogin = () => {
  window.location.href = "http://localhost:5000/api/auth/github"
  }

  return (
    <div className="w-[90%] sm:max-w-[80%] top-7 text-white bg-[linear-gradient(to_bottom,_#000_50%,_#460F9E_100%)] rounded-xl relative sm:top-20 m-auto z-50 min-h-[80vh] border border-[#666666]">
      <Navbar />
    
      <div className="main px-4 sm:px-14 py-6 flex flex-col-reverse sm:flex-row justify-center items-center gap-10">
        {/* Left Section */}
        <div className="left w-full sm:w-4/6 px-2 sm:px-10 flex flex-col gap-4">
          <h1 style={{ fontFamily: "'Orbitron', sans-serif",}} className="text-3xl sm:text-5xl mt-4 font-bold leading-tight">
            Automate Your Test Case <br/> Generation with AI
          </h1>
          <p className="text-sm sm:text-base">
            
            From code to coverage — let our AI handle your test creation in seconds
          </p>
          <div className="sign gap-4 flex flex-col sm:flex-row">
            <div className="i w-full sm:w-[20vw] h-[40px] rounded-lg bg-[#1C1E23]" />
            <div onClick={handleScroll}  className="p z-50 cursor-pointer">
              
              <VioletBtn text="Get Started" />
            
            </div>
          </div>
          <div className="text text-sm sm:text-base">
            Once authenticated, select a GitHub repository to proceed.
          </div>
        </div>

        {/* Right Section */}
        <div className="right w-full mt-10 sm:w-2/6 flex justify-center">
          <img
            src={robot}
            className="h-[40vh] sm:h-[60vh] w-full"
            alt="robot"
          />
        </div>
      </div>

      {/* Stars Background */}
     
    </div>
  );
};

export default HomeMainPage;
