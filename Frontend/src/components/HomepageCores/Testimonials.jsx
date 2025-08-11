import React from 'react';
import testimonials from '../Data/TestimonialData';
import { motion } from 'framer-motion';
const Testimonials = () => {
  return (
    <div className=" bg-[linear-gradient(to_bottom,_#000_50%,_#460F9E_100%)] pb-10 flex-col text-white justify-center items-center flex min-h-screen overflow-hidden px-8 md:px-20">
      
      {/* Heading */}
      <div className="mt-10 flex text-center flex-col max-w-3xl">
        <h1
          style={{
            fontFamily: "'Orbitron', sans-serif",
            WebkitBackgroundClip: "text",
            textShadow:
              "0 0 15px rgba(168,85,247,0.7), 0 0 30px rgba(99,102,241,0.5)",
          }}
          className="text-4xl font-bold"
        >
          What Our Users Are Saying
        </h1>
        <h4 className="mt-3 text-lg text-gray-300">
          Real feedback from developers and QA teams who’ve supercharged their
          testing with TestCaseGenerator.
        </h4>
      </div>

      {/* Content */}
      <div className="w-full flex flex-col md:flex-row gap-10 mt-12">
        
        {/* Left Side Featured Card */}
        <div className="md:w-2/6 flex justify-center  md:justify-start">
        
          <motion.div 
          initial={{rotateY: 90, opacity: 0}}
          whileInView={{rotateY: 0, opacity: 1}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-[90%] md:w-full hover:scale-105 transition-all duration-300  h-[50vh] rounded-2xl -rotate-4 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-lg p-6 flex  gap-5 flex-col justify-center items-center">
              <div className="flex items-center  mt-6 gap-4">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User"
                className="w-20 h-20 rounded-full border-2 border-violet-400"
              />
              <div>
                <h3 className="font-semibold text-xl">Nina Kapoor</h3>
                <p className="text-lg text-gray-300 ">QA Lead</p>
              </div>
            </div>

            <p className="text-lg italic text-center">
              "This tool completely transformed our QA process and saved our team
              countless hours!"
            </p>
           
          </motion.div>
        </div>

        {/* Right Side Four Cards */}
        <div className="md:w-4/6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.slice(0, 4).map((item, index) => (
            <motion.div
             initial={item.initial}
          whileInView={item.animate}
          transition={{ duration: 0.8, ease: "easeOut" }}
              key={index}
              className="h-auto p-5 backdrop-blur-2xl rounded-2xl bg-white/10 border border-white/20 shadow-lg hover:scale-105 transition-all duration-300 flex flex-col justify-center"
            >
             
              <div className="flex items-center gap-3">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-20 h-20 rounded-full border-2 border-violet-400"
                />
                <div>
                  <h3 className="sm:text-xl text-lg font-semibold">{item.name}</h3>
                  <p className="sm:text-lg text-sm text-gray-300">{item.email}</p>
                </div>
              </div>
               <p className="sm:text-lg text-xs mt-2 italic">"{item.testimonial}"</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
