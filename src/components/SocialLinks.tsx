"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";

const SocialLinks = () => {
  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:contact@example.com",
      label: "Email",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <motion.div
      className="flex gap-4 justify-center"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={index}
          href={link.href}
          aria-label={link.label}
          className="p-3 rounded-full bg-background/30 backdrop-blur-sm border border-primary hover:border-primary hover:shadow-glow transition-all duration-300"
          variants={item}
          whileHover={{ y: -5, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
