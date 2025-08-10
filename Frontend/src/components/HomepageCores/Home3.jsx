import React from 'react';
import bg from "../../assets/images/bg.svg";

const Home3 = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="min-h-screen flex"
    >
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center px-12 text-white">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-lg leading-relaxed ">
          Discover a world of opportunities with our courses.
          Learn at your own pace and achieve your goals with ease. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque cupiditate rem accusantium inventore, enim esse ipsam ducimus aut exercitationem perferendis?
        </p>
      </div>

      {/* Right Section (Glassy Effect) */}
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="w-[90%] h-[50vh] bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/30"></div>
      </div>
    </div>
  );
};

export default Home3;
