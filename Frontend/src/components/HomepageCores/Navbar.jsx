

import React, { useState } from "react";
import VioletBtn from "../common/VioletBtn";
import GrayBtn from "../common/GrayBtn";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const Navbar = () => {
  const token = localStorage.getItem("tokens");
  const [messageAlert, setMessageAlert] = useState(false);

  const handleScroll = (page) => {
    const nextSection = document.getElementById(page);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("tokens");
    setMessageAlert(false);
    toast.success("Logout Successful!");
    handleScroll("Home2")
  };

  return (
    <div className="w-[80%] flex text-lg justify-center sm:justify-evenly items-center text-white rounded-t-2xl rounded-b-xl m-auto h-[60px] bg-[#13151B] border-t-1 border-[#666666] relative top-10">
      {/* Logo */}
      <div className="logo flex justify-center items-center gap-3 font-bold ">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="/logo2.png"
            className="h-10 hover:scale-110 transition-all ease-out duration-300"
            alt=""
          />
        </motion.div>
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          GitTestPULSe
        </motion.span>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <ul className="flex max-[1200px]:hidden justify-evenly items-center gap-8">
          <li
            className="cursor-pointer hover:text-violet-600 transition-all ease-out duration-500"
            onClick={() => handleScroll("working")}
          >
            Working
          </li>
          <li
            className="cursor-pointer hover:text-violet-600 transition-all ease-out duration-500"
            onClick={() => handleScroll("about")}
          >
            About
          </li>
          <li
            className="cursor-pointer hover:text-violet-600 transition-all ease-out duration-500"
            onClick={() => handleScroll("testimonials")}
          >
            Testimonials
          </li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="btns max-[800px]:hidden flex justify-evenly gap-8">
        <div className="cursor-pointer">
          {token ? (
            <div onClick={() => setMessageAlert(true)}>
              <VioletBtn text="Logout" />
            </div>
          ) : (
            <div onClick={() => handleScroll("Home")}>
              <VioletBtn text="Login" />
            </div>
          )}
        </div>
        <div className="cursor-pointer" onClick={() => handleScroll("contact")}>
          <GrayBtn className="cursor-pointer" text="Contact Us" />
        </div>
      </div>

      {/* Logout Popup */}
      <AnimatePresence>
        {messageAlert && (
          <>
          
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMessageAlert(false)}
            ></motion.div>

            {/* Popup Box */}
            <motion.div
              className="fixed top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 left-1/2 w-[90%] max-w-[400px] bg-white/10 backdrop-blur-2xl border border-violet-500 rounded-2xl p-6  text-center shadow-lg"
              initial={{ scale: 0.7, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: -50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h2 className="text-xl font-bold text-violet-400 mb-4">
                Confirm Logout
              </h2>
              <p className="text-white/80 mb-6">
                After logout, you will need to login again to continue using
                GitTestPULSe.
              </p>
              <div className="flex gap-4 justify-center">
                <div onClick={handleLogoutConfirm} className="cursor-pointer">
                  <VioletBtn text="Logout" />
                </div>
                <div
                  onClick={() => setMessageAlert(false)}
                  className="cursor-pointer"
                >
                  <GrayBtn text="Still Login" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
