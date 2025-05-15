"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number;
  color?: "primary" | "secondary" | "accent";
  delay?: number;
}

const SkillBar = ({
  name,
  level,
  color = "primary",
  delay = 0,
}: SkillBarProps) => {
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      className="space-y-2"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay },
        },
      }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex justify-between">
        <span className="font-medium">{name}</span>
        <span className={`text-${color} font-semibold`}>{level}%</span>
      </div>

      <div className={`h-2 bg-muted/30 rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full bg-${color} shadow-glow-${color}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
          style={{
            // Fallback inline style in case the utility classes don't work
            width: isInView ? `${level}%` : 0,
            backgroundColor: `var(--${color})`,
          }}
        />
      </div>
    </motion.div>
  );
};

export default SkillBar;
