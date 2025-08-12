import React, { useState } from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const Footer = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const handleScroll = (page) => {
    const nextSection = document.getElementById(page);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleComingSoonClick = () => {
    setPopupOpen(true);
  };

  return (
    <footer className="relative flex flex-col bg-[linear-gradient(to_bottom,_#000_60%,_#460F9E_100%)] h-auto  md:h-[50vh] items-center bg-black text-white py-12 overflow-x-hidden">
      {/* Star background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-[starMove_40s_linear_infinite]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mb-5 w-full max-w-[90vw] px-6  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Column 1 */}
        <div>
          <h2 className="text-2xl flex gap-2 font-bold">
            GitTestPULSe
            <img src="/logo2.png" className="h-10 w-10" alt="" />
          </h2>
          <p className="mt-4 text-gray-400 text-md leading-relaxed">
            Generate accurate, efficient, and customizable test cases in
            seconds.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li
              onClick={() => handleScroll("Home")}
              className="hover:text-violet-400 cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => handleScroll("about")}
              className="hover:text-violet-400 cursor-pointer"
            >
              About
            </li>
            <li
              onClick={() => handleScroll("working")}
              className="hover:text-violet-400 cursor-pointer"
            >
              Working
            </li>
            <li
              onClick={() => handleScroll("contact")}
              className="hover:text-violet-400 cursor-pointer"
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            {["Blog", "Docs", "Community", "Support"].map((item) => (
              <li
                key={item}
                onClick={handleComingSoonClick}
                className="hover:text-violet-400 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 - Know More */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Know More</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            {[
              "Careers",
              "Privacy Policy",
              "Terms & Conditions",
              "FAQs",
            ].map((item) => (
              <li
                key={item}
                onClick={handleComingSoonClick}
                className="hover:text-violet-400 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5 - Subscribe */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <p className="text-gray-400 text-sm">
            Stay ahead with the latest updates and tips. Subscribe now and
            supercharge your testing workflow!
          </p>
          <button  onClick={() => handleScroll("contact")} className="bg-gradient-to-r cursor-pointer from-violet-600 to-pink-500 px-5 py-2 mt-4 rounded-xl font-semibold text-sm hover:scale-105 transition-all duration-300">
            Contact Now
          </button>
        </div>
      </div>

      {/* Footer bottom */}
      <div className=" z-10 w-full mt-12 border-t absolute bottom-0 border-gray-700 h-[5vh] flex flex-col md:flex-row justify-between items-center gap-4 px-6 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} GitTestPULSe. All rights reserved.</p>

        {/* Social icons */}
        <div className="flex gap-5 text-xl">
          <a
            href="#"
            className="hover:text-pink-500 transition-colors duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="#"
            className="hover:text-sky-400 transition-colors duration-300"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-b from-violet-700 h-[220px] flex justify-center items-center flex-col to-violet-900 p-6 rounded-2xl text-white shadow-xl relative w-80 text-center"
            >
              {/* Close button */}
              <button
                onClick={() => setPopupOpen(false)}
                className="absolute cursor-pointer top-3 right-3 text-white hover:text-gray-300"
              >
                <IoMdClose size={24} />
              </button>

              <h2 className="text-2xl font-bold mb-2">🚧 Coming Soon!</h2>
              <p className="text-gray-300 text-sm">
                This feature is under development. Stay tuned!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
