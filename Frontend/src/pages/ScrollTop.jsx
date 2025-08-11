import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <motion.div
          className="fixed bottom-5 right-5 z-[150]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.button
            onClick={scrollToTop}
            className="flex justify-center cursor-pointer items-center h-[50px] w-[50px] rounded-full bg-gradient-to-br from-violet-500 via-black to-violet-900 text-white shadow-lg"
            whileHover={{
              scale: 1.2,
              boxShadow: "0 0 15px rgba(139, 92, 246, 0.8), 0 0 30px rgba(0,0,0,0.6)",
            }}
            animate={{
              boxShadow: [
                "0 0 10px rgba(139, 92, 246, 0.6)",
                "0 0 20px rgba(139, 92, 246, 0.8)",
                "0 0 10px rgba(139, 92, 246, 0.6)",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
          >
            <FaArrowUp className="text-xl" />
          </motion.button>
        </motion.div>
      )}
    </>
  );
};

export default ScrollTop;
