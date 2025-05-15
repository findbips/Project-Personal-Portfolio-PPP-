"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechGrowth Inc.",
    content:
      "Working with this developer was a game-changer for our company website. The WordPress implementation was flawless, and the AI integrations have significantly improved our user engagement metrics.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "Global Solutions Ltd.",
    content:
      "The international business perspective combined with technical expertise made all the difference. Our e-commerce platform now seamlessly serves customers across multiple countries with localized experiences.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Product Manager",
    company: "Creative Designs Co.",
    content:
      "The attention to detail and creative problem-solving approach resulted in a website that not only looks stunning but also performs exceptionally well. The AI-powered features have given us a competitive edge.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
];

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-secondary opacity-20">
        <Quote size={80} />
      </div>

      <div className="overflow-hidden relative min-h-[300px]">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            <div className="text-center px-4 md:px-8">
              <p className="text-lg md:text-xl mb-8 italic text-muted-foreground">
                "{testimonials[currentIndex].content}"
              </p>

              <div className="flex flex-col items-center">
                {testimonials[currentIndex].avatar && (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary mb-3 shadow-glow-secondary">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h4 className="text-xl font-bold neon-text-secondary">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-muted-foreground">
                  {testimonials[currentIndex].role},{" "}
                  {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8 gap-2">
        <motion.button
          onClick={handlePrevious}
          className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-secondary hover:shadow-glow-secondary"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="h-5 w-5 text-secondary" />
        </motion.button>

        <div className="flex items-center gap-2 mx-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-secondary w-4 shadow-glow-secondary" : "bg-muted"}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-secondary hover:shadow-glow-secondary"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-5 w-5 text-secondary" />
        </motion.button>
      </div>
    </div>
  );
};

export default TestimonialsSlider;
