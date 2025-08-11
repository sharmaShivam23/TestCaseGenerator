import React from 'react';
import bg2 from "../../assets/images/Reflect.jpeg";
import ai from "../../assets/images/ai.svg";
const Home3 = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8) 50%, rgba(70,15,158,0.9) 100%), url(${bg2})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="min-h-screen flex  flex-col sm:flex-row relative z-10"
    >


            {/* Right Section (Glassy Effect) */}
      <div className="flex-1 flex items-center justify-center relative p-12">
      
        <div className="w-[90%] h-[50vh] relative bg-white/10 backdrop-blur-md flex justify-center items-center rounded-xl shadow-lg border border-white/30">
          <div className="h absolute -top-10 bg-white/10 px-5 rotate-8 right-20 max-w-max p-2 py-2 text-white rounded-2xl backdrop-blur-xl ">Hii , I am GittestPulse</div>
        <img src={ai} className='h-96' alt="" />
        </div>
      </div>

      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center px-12 text-white">
        <h1  style={{
            fontFamily: "'Orbitron', sans-serif",
            WebkitBackgroundClip: "text",
            textShadow:
              "0 0 15px rgba(168,85,247,0.7), 0 0 30px rgba(99,102,241,0.5)",
          }} className="text-5xl font-bold mb-4">
           About Us
        </h1>
        <p className="text-sm sm:text-lg leading-relaxed">
         Software testing is one of the most time-consuming parts of development. Writing detailed, accurate, and comprehensive test cases often takes more time than writing the actual code — and let’s be honest, it can be repetitive and frustrating.
We built TestCaseGenerator to take away that pain. Our goal is to help developers, QA engineers, and project managers instantly create well-structured test cases from requirements, user stories, or even source code.
        </p>
      </div>


    </div>
  );
};

export default Home3;
