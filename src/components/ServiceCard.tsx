"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color?: "primary" | "secondary" | "accent";
  delay?: number;
}

const ServiceCard = ({
  title,
  description,
  icon,
  color = "accent",
  delay = 0,
}: ServiceCardProps) => {
  return (
    <motion.div
      className={`relative group rounded-lg bg-background/30 backdrop-blur-sm border border-${color} p-6 hover:shadow-glow-${color} transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className={`mb-4 text-${color}`}>{icon}</div>

      <h3
        className={`text-xl font-bold mb-3 group-hover:text-${color} transition-colors duration-300`}
      >
        {title}
      </h3>

      <p className="text-muted-foreground">{description}</p>

      <motion.div
        className={`absolute bottom-0 left-0 h-1 bg-${color}`}
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ServiceCard;
