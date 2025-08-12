import React from 'react'
import VioletBtn from '../common/VioletBtn'
import GrayBtn from '../common/GrayBtn'
import { motion } from 'framer-motion'
const Navbar = () => {

   const handleScroll = (page) => {
    console.log(page);
    
    const nextSection = document.getElementById(page);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className='w-[80%] flex text-lg justify-center sm:justify-evenly items-center text-white rounded-t-2xl rounded-b-xl m-auto h-[60px] bg-[#13151B] border-t-1 border-[#666666] relative top-10'>
     <div  className="logo flex justify-center items-center gap-3 font-bold ">
     <motion.div 
      initial={{ y: -30, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}> <img src="/logo2.png" className='h-10 hover:scale-110 transition-all ease-out duration-300' alt="" /> </motion.div>
  <motion.span  initial={{ scale: 0,  }}
  whileInView={{ scale: 1,}}
  transition={{ duration: 0.5, ease: "easeOut" }} style={{ fontFamily: "'Orbitron', sans-serif",}}>GitTestPULSe</motion.span> 
      </div>
      <div className="tabs">
        <ul className='flex  max-[1200px]:hidden  justify-evenly items-center gap-8'>
          <li className='cursor-pointer hover:text-violet-600 transition-all ease-out duration-500' onClick={() => handleScroll("working")}>Working</li>
          <li className='cursor-pointer hover:text-violet-600 transition-all ease-out duration-500' onClick={() => handleScroll("about")}>About</li>
          <li className='cursor-pointer hover:text-violet-600 transition-all ease-out duration-500' onClick={() => handleScroll("testimonials")}>Testimonials</li>
        </ul>
      </div>
      <div className="btns max-[800px]:hidden flex justify-evenly  gap-8">
        <div className='cursor-pointer' onClick={() => handleScroll("Home")}>
        <VioletBtn  text="Login"/>
          </div>
        <div className='cursor-pointer' onClick={() => handleScroll("contact")}>
        <GrayBtn className='cursor-pointer' text="Contact Us"/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
