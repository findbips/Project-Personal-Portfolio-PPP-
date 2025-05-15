"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlowingIconProps {
  icon: ReactNode;
  color?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const GlowingIcon = ({
  icon,
  color = "primary",
  size = "md",
  className = "",
}: GlowingIconProps) => {
  const sizeClasses = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
    xl: "p-5",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-10 w-10",
  };

  return (
    <motion.div
      className={`rounded-full bg-background/30 backdrop-blur-sm border border-${color} shadow-glow-${color} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`text-${color} ${iconSizes[size]}`}>{icon}</div>
    </motion.div>
  );
};

export default GlowingIcon;
