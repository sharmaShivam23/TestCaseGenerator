import React from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative flex flex-col h-[40vh] items-center bg-black text-white py-12 overflow-hidden">
      {/* Star background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-[starMove_40s_linear_infinite]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mb-5 w-full max-w-[90vw] px-6  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        
        {/* Column 1 */}
        <div>
          {/* <div className="flex items-center gap-4">
         
             <h3 className="text-lg font-semibold mb-4">About</h3>
          </div>
          <p className="mt-4 text-gray-400 text-md leading-relaxed">
            Generate accurate, efficient, and customizable test cases in seconds.
            Empowering developers and testers to deliver flawless software faster. */}
          {/* </p> */}
           <h2 className="text-2xl flex gap-2 font-bold">GitTestPULSe
              <img src="/logo2.png" className="h-10 w-10" alt="" />
            </h2>
             <p className="mt-4 text-gray-400 text-md leading-relaxed">
            Generate accurate, efficient, and customizable test cases in seconds.
            </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-violet-400 cursor-pointer">Home</li>
            <li className="hover:text-violet-400 cursor-pointer">About</li>
            <li className="hover:text-violet-400 cursor-pointer">Services</li>
            <li className="hover:text-violet-400 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-violet-400 cursor-pointer">Blog</li>
            <li className="hover:text-violet-400 cursor-pointer">Docs</li>
            <li className="hover:text-violet-400 cursor-pointer">Community</li>
            <li className="hover:text-violet-400 cursor-pointer">Support</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Know More</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-violet-400 cursor-pointer">Careers</li>
            <li className="hover:text-violet-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-violet-400 cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-violet-400 cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* Column 5 - Subscribe */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <p className="text-gray-400 text-sm">
            Stay ahead with the latest updates and tips.  
            Subscribe now and supercharge your testing workflow!
          </p>
          <button className="bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-2 mt-4 rounded-xl font-semibold text-sm hover:scale-105 transition-all duration-300">
            Contact Now
          </button>
        </div>
      </div>

      {/* Footer bottom */}
      {/* <div className="p flex justify-center items-center"> */}
      <div className=" z-10 w-full mt-12 border-t absolute bottom-0 border-gray-700 h-[5vh] flex flex-col md:flex-row justify-between items-center gap-4 px-6 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} GitTestPULSe. All rights reserved.</p>

        {/* Social icons */}
        <div className="flex gap-5 text-xl">
          <a href="#" className="hover:text-pink-500 transition-colors duration-300">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-blue-500 transition-colors duration-300">
            <FaLinkedin />
          </a>
          <a href="#" className="hover:text-sky-400 transition-colors duration-300">
            <FaTwitter />
          </a>
        </div>
      </div>
      {/* </div> */}

      {/* Star movement animation */}
      <style>
        {`
          @keyframes starMove {
            from { background-position: 0 0; }
            to { background-position: 1000px 1000px; }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
