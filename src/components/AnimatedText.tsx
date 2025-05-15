"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  type?: "chars" | "words" | "lines";
}

const AnimatedText = ({
  text,
  className = "",
  once = true,
  delay = 0,
  type = "words",
}: AnimatedTextProps) => {
  // Split text into individual elements based on type
  const getElements = () => {
    if (type === "chars") return text.split("");
    if (type === "words") return text.split(" ");
    return [text]; // lines
  };

  const elements = getElements();

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {type === "chars" && (
        <span className="inline-block whitespace-pre-wrap">
          {elements.map((char, index) => (
            <motion.span key={index} variants={child} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      )}

      {type === "words" && (
        <span className="inline-block whitespace-pre-wrap">
          {elements.map((word, index) => (
            <motion.span key={index} variants={child} className="inline-block">
              {word}
              {index !== elements.length - 1 && "\u00A0"}
            </motion.span>
          ))}
        </span>
      )}

      {type === "lines" && (
        <span className="block">
          {elements.map((line, index) => (
            <motion.span key={index} variants={child} className="block">
              {line}
            </motion.span>
          ))}
        </span>
      )}
    </motion.div>
  );
};

export default AnimatedText;
