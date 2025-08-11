


import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../../lib/utils";
import { motion } from "framer-motion";

export const InteractiveHoverButton = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <motion.button
       initial={{ scale : 1.3, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
      ref={ref}
      className={cn(
        "group relative w-auto text-xl mt-3 hover:text-violet-800 hover:shadow-2xl shadow-violet-600 cursor-pointer overflow-hidden rounded-full border bg-background p-3 px-6 text-center font-semibold",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-primary bg-white  transition-all duration-300 group-hover:scale-[100.8]"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </motion.button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
