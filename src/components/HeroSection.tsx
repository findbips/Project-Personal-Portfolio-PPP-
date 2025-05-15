"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  BrainCircuit,
  Sparkles,
  Bot,
  Network,
  Lightbulb,
} from "lucide-react";
import { Button } from "./ui/button";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  title = "AI-Powered WordPress Development",
  subtitle = "Transforming ideas into intelligent digital experiences with cutting-edge AI integration",
  ctaText = "Explore My Work",
  onCtaClick = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  },
}: HeroSectionProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; speed: number }[]
  >([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-background to-background/90 dark:from-background dark:via-background/95 dark:to-primary/5">
      {/* Neural network background */}
      <div
        className="absolute inset-0 z-0 opacity-20 dark:opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />

      {/* Digital particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-primary/30 dark:bg-primary/50"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, particle.speed * 100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + particle.speed * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animated grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10 dark:opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 flex items-center justify-center space-x-3"
        >
          <BrainCircuit className="h-6 w-6 text-primary animate-pulse" />
          <span className="text-lg font-medium text-primary">
            AI Integration
          </span>
          <span className="h-4 w-px bg-border"></span>
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          <span className="text-lg font-medium text-primary">
            Creative Solutions
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl dark:text-glow"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            onClick={onCtaClick}
            className="px-8 py-6 text-lg bg-primary/90 hover:bg-primary/100 dark:shadow-glow"
          >
            <Lightbulb className="mr-2 h-5 w-5" />
            {ctaText}
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center"
          >
            <span className="mb-2 text-sm text-muted-foreground">
              Scroll Down
            </span>
            <ArrowDown className="h-5 w-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating animated shapes */}
      <motion.div
        className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-primary/10 dark:bg-primary/20 dark:blur-md"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[15%] top-[30%] h-24 w-24 rounded-full bg-secondary/10 dark:bg-accent/30 dark:blur-md"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[25%] left-[20%] h-40 w-40 rounded-full bg-accent/10 dark:bg-chart-3/20 dark:blur-md"
        animate={{
          x: [0, 40, 0],
          y: [0, 20, 0],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* AI-themed floating elements */}
      <motion.div
        className="absolute right-[25%] bottom-[35%] text-primary/70 dark:text-primary/90"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      >
        <Bot size={48} />
      </motion.div>

      <motion.div
        className="absolute left-[30%] top-[25%] text-primary/70 dark:text-primary/90"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      >
        <Network size={42} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
