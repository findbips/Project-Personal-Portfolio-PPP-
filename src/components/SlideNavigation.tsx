"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SlideNavigationProps {
  totalSlides: number;
  currentSlide: number;
  onNavigate: (slideIndex: number) => void;
}

const SlideNavigation = ({
  totalSlides,
  currentSlide,
  onNavigate,
}: SlideNavigationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navigation when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navigatePrev = () => {
    if (currentSlide > 0) {
      onNavigate(currentSlide - 1);
    }
  };

  const navigateNext = () => {
    if (currentSlide < totalSlides - 1) {
      onNavigate(currentSlide + 1);
    }
  };

  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0.3,
        x: 0,
        transition: { duration: 0.3 },
      }}
    >
      {/* Slide indicators */}
      <div className="flex flex-col items-center gap-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-primary shadow-glow scale-125"
                : "bg-muted hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex flex-col gap-2 mt-4">
        <motion.button
          onClick={navigatePrev}
          className={`p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border ${currentSlide === 0 ? "opacity-30" : "hover:border-primary hover:shadow-glow"}`}
          whileHover={currentSlide > 0 ? { scale: 1.1 } : {}}
          whileTap={currentSlide > 0 ? { scale: 0.9 } : {}}
          disabled={currentSlide === 0}
        >
          <ChevronUp className="h-5 w-5 text-primary" />
        </motion.button>
        <motion.button
          onClick={navigateNext}
          className={`p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border ${currentSlide === totalSlides - 1 ? "opacity-30" : "hover:border-primary hover:shadow-glow"}`}
          whileHover={currentSlide < totalSlides - 1 ? { scale: 1.1 } : {}}
          whileTap={currentSlide < totalSlides - 1 ? { scale: 0.9 } : {}}
          disabled={currentSlide === totalSlides - 1}
        >
          <ChevronDown className="h-5 w-5 text-primary" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SlideNavigation;
