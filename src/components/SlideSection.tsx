"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SlideSectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  bgColor?: string;
  accentColor?: "primary" | "secondary" | "accent";
  index: number;
}

const SlideSection = ({
  id,
  className = "",
  children,
  bgColor = "bg-background",
  accentColor = "primary",
  index,
}: SlideSectionProps) => {
  const slideVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0 },
  };

  return (
    <section
      id={id}
      className={`slide ${bgColor} ${className}`}
      data-index={index}
    >
      <motion.div
        className="h-full w-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-16"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        variants={slideVariants}
        viewport={{ once: false, amount: 0.8 }}
      >
        {children}
      </motion.div>

      {/* Decorative corner elements */}
      <div
        className={`absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-${accentColor} border-glow-${accentColor}`}
      ></div>
      <div
        className={`absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-${accentColor} border-glow-${accentColor}`}
      ></div>
      <div
        className={`absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-${accentColor} border-glow-${accentColor}`}
      ></div>
      <div
        className={`absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-${accentColor} border-glow-${accentColor}`}
      ></div>
    </section>
  );
};

export default SlideSection;
