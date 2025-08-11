import React from 'react'
import VioletBtn from '../common/VioletBtn'
import GrayBtn from '../common/GrayBtn'
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
      <div className="logo flex justify-center items-center gap-3 font-bold ">
      <img src="/logo2.png" className='h-10' alt="" /> <span style={{ fontFamily: "'Orbitron', sans-serif",}}> GitTestPulse</span> 
      </div>
      <div className="tabs">
        <ul className='sm:flex hidden  justify-evenly items-center gap-8'>
          <li className='cursor-pointer' onClick={() => handleScroll("working")}>Working</li>
          <li className='cursor-pointer' onClick={() => handleScroll("about")}>About</li>
          <li className='cursor-pointer' onClick={() => handleScroll("work")}>Testimonials</li>
        </ul>
      </div>
      <div className="btns hidden sm:flex justify-evenly  gap-8">
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
