import React from "react";
import { Example } from "../ui/GridBg"; // Your grid background component
import { InteractiveHoverButton } from "../ui/Button2";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stars from "../../assets/images/stars.svg";

// import { Particles } from "../ui/Particles";
const Home2 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log(token);
    
    if (token) {
      localStorage.setItem("tokens", token);
      // navigate("/auth/callback");
      navigate("/select-repo");
    }
  }, [navigate]);

  const handleLogin = () => {
  window.location.href = "https://testcasegenerator.onrender.com/api/auth/github"
  // window.location.href = "http://localhost:5000/api/auth/github"
  }

  return (
    <>
      {/* Particles background */}
    
      <div id="Home" className="relative min-h-screen w-full flex items-center justify-center text-white bg-black overflow-hidden">
         <div className="stars absolute bottom-0 w-full flex justify-center">
                <img src={stars} className="h-40 sm:h-80 object-contain" alt="stars" />
              </div>

        <div className="relative z-[100] min-h-screen w-full flex items-center justify-center bg-[linear-gradient(to_bottom,_#000_50%,_#460F9E_100%)] overflow-hidden">  
          
       
          <div className="absolute w-[400px] h-[600px] bg-[#460F9E] rounded-full blur-[200px] opacity-60"></div>
           
      
          <div className="relative z-5 w-full max-w-4xl">
            <Example />
          </div>

           <div  onClick={handleLogin} className="btn flex absolute top-1/2 sm:mt-16 mt-24 z-50  justify-center items-center">
          <InteractiveHoverButton>Continue with GitHub</InteractiveHoverButton>
          </div>
          

        </div>
      </div>
    </>
  );
};

export default Home2;
