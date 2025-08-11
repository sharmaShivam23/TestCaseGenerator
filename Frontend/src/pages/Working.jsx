import React from 'react'
import { HowItWorksSteps } from '../components/Data/WorkingData'
import glow from "../assets/images/glow.jpeg"
const Working = () => {
  
    const handleScroll = () => {
    const nextSection = document.getElementById("Home");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }



  return (
    <div id="working" className='w-full lg:min-h-screen h-auto  flex justify-center z-50 relative items-center text-center flex-col  text-white  bg-[linear-gradient(to_bottom,_#000_70%,_#460F9E_100%)]'>
        <img src={glow} className='object-cover w-full h-full absolute top-0 z-10 opacity-20 ' alt="" />
      <div className="head z-50">
        <h1 className='md:text-5xl text-2xl text-white font-bold' style={{
            fontFamily: "'Orbitron', sans-serif",
            background: "linear-gradient(90deg, #a855f7, #6366f1)",
            WebkitBackgroundClip: "text",
            textShadow:
              "0 0 15px rgba(168,85,247,0.7), 0 0 30px rgba(99,102,241,0.5)",
          }}>How It Works</h1>
          <h4 className='text-xl mt-2'>See How Our TestCaseGenerator Transforms Your Testing Workflow — Step by Step</h4>
      </div>

      <div className="cards z-50 grid mb-10 sm:mb-0 md:grid-cols-2 grid-cols-1  gap-5 mt-10">
       {HowItWorksSteps.map((item , index) => (
        <div  key={index} className="cards sm:w-[350px] transition-all ease-in duration-100 hover:scale-102 cursor-pointer flex p-10 justify-center items-center flex-col w-[300px] md:w-[600px] h-auto  md:h-[35vh] backdrop-blur-2xl bg-white/10  rounded-2xl ">
             <div style={{
            fontFamily: "'Orbitron', sans-serif",
            background: "linear-gradient(90deg, #a855f7, #6366f1)",
            WebkitBackgroundClip: "text",
            textShadow:
              "0 0 15px rgba(168,85,247,0.7), 0 0 30px rgba(99,102,241,0.5)",
          }} className="head text-2xl mb-5 font-bold">
              {item.step}
             </div>
             <div className="head text-xl font-semibold mb-2">
              {item.title}
             </div>
             <div className="head text-md">
              {item.description}
             </div>
             {item?.buttonLabel && (
                <button onClick={handleScroll} className="px-4 py-2 mt-4 cursor-pointer rounded-lg bg-gradient-to-r from-violet-500 to-pink-500 hover:from-pink-500 hover:to-violet-500 transition-all duration-300 text-sm font-medium">
                  {item.buttonLabel}
                </button>
              )}
        </div>

        ))}
      </div>

    </div>
  )
}

export default Working