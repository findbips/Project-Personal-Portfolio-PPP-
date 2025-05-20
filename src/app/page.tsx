"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Code,
  Database,
  Globe,
  Lightbulb,
  Sparkles,
  BrainCircuit,
  Laptop,
  Palette,
  ShoppingCart,
  Users,
  Briefcase,
  LineChart,
  ChevronDown,
  Moon as MoonIcon,
  Sun as SunIcon,
  ArrowDown,
} from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import SlideNavigation from "@/components/SlideNavigation";
import ProgressIndicator from "@/components/ProgressIndicator";
import SlideSection from "@/components/SlideSection";
import AnimatedText from "@/components/AnimatedText";
import ParallaxImage from "@/components/ParallaxImage";
import GlowingIcon from "@/components/GlowingIcon";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import SkillBar from "@/components/SkillBar";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  // Set default theme to dark
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setTheme("dark");
  }, [setTheme]);

  // Handle slide navigation
  const navigateToSlide = (slideIndex: number) => {
    if (slideContainerRef.current) {
      const slideElement = document.querySelector(
        `[data-index="${slideIndex}"]`,
      );
      if (slideElement) {
        slideElement.scrollIntoView({ behavior: "smooth" });
        setCurrentSlide(slideIndex);
      }
    }
  };

  // Update current slide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (slideContainerRef.current) {
        const slides = document.querySelectorAll(".slide");
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        slides.forEach((slide, index) => {
          const slideTop = slide.getBoundingClientRect().top + window.scrollY;
          const slideBottom = slideTop + slide.getBoundingClientRect().height;

          if (scrollPosition >= slideTop && scrollPosition < slideBottom) {
            setCurrentSlide(index);
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample projects data
  const projects = [
    {
      title: "E-commerce Website Redesign",
      description:
        "Complete redesign of an e-commerce platform with custom WooCommerce integration, payment gateways, and multilingual support.",
      image:
        "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
      technologies: [
        "WordPress",
        "WooCommerce",
        "Custom Plugins",
        "Multilingual",
      ],
      link: "#",
    },
    {
      title: "Corporate Website",
      description:
        "Modern corporate website with custom post types, advanced filtering, and integration with CRM systems.",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
      technologies: ["WordPress", "Custom Theme", "API Integration"],
      link: "#",
    },
    {
      title: "Membership Portal",
      description:
        "Exclusive membership site with tiered access levels, payment processing, and member-only content areas.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      technologies: ["WordPress", "Membership Plugins", "Custom Development"],
      link: "#",
    },
  ];

  // WordPress skills
  const wordpressSkills = [
    { name: "WordPress Development", level: 95 },
    { name: "WooCommerce", level: 90 },
    { name: "Custom Plugin Development", level: 85 },
    { name: "Theme Customization", level: 92 },
  ];

  // Business skills
  const businessSkills = [
    { name: "International Business", level: 88 },
    { name: "Client Management", level: 90 },
    { name: "Project Management", level: 85 },
    { name: "Business Analytics", level: 80 },
  ];

  // Services
  const services = [
    {
      title: "Custom WordPress Development",
      description:
        "Tailored WordPress solutions built from scratch to meet your specific business requirements and goals.",
      icon: <Code size={32} />,
    },
    {
      title: "E-commerce Solutions",
      description:
        "WooCommerce stores with custom functionality, payment gateways, and optimized checkout processes.",
      icon: <ShoppingCart size={32} />,
    },
    {
      title: "Plugin Development",
      description:
        "Custom WordPress plugins that extend functionality and integrate with third-party services.",
      icon: <Database size={32} />,
    },
    {
      title: "International Business Consulting",
      description:
        "Strategic guidance for businesses looking to expand globally with culturally appropriate digital solutions.",
      icon: <Globe size={32} />,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Progress indicator */}
      <ProgressIndicator />

      {/* Theme Toggle Button */}
      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {mounted ? (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/30 backdrop-blur-sm border border-primary hover:shadow-glow"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5 text-primary" />
            ) : (
              <MoonIcon className="h-5 w-5 text-primary" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/30 backdrop-blur-sm border border-primary"
          />
        )}
      </motion.div>

      {/* Slide Navigation */}
      <SlideNavigation
        totalSlides={6}
        currentSlide={currentSlide}
        onNavigate={navigateToSlide}
      />

      {/* Main Content - Slides Container */}
      <main ref={slideContainerRef} className="slide-container no-scrollbar">
        {/* Hero Slide */}
        <SlideSection id="hero" index={0} accentColor="primary">
          <div className="absolute inset-0 z-0 animated-grid opacity-20" />

          <div className="absolute inset-0 z-0">
            {Array.from({ length: 50 }).map((_, index) => {
              const size = Math.random() * 3 + 1;
              const x = Math.random() * 100;
              const y = Math.random() * 100;
              const duration = 5 + Math.random() * 5;

              return (
                <motion.div
                  key={index}
                  className="absolute rounded-full bg-primary/30"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                  animate={{
                    y: [0, Math.random() * 100 - 50, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4 flex items-center justify-center space-x-3"
            >
              <BrainCircuit className="h-6 w-6 text-primary animate-pulse" />
              <span className="text-lg font-medium text-primary">
                WordPress Specialist
              </span>
              <span className="h-4 w-px bg-border"></span>
              <Globe className="h-6 w-6 text-primary animate-pulse" />
              <span className="text-lg font-medium text-primary">
                Global Business
              </span>
            </motion.div>

            <AnimatedText
              text="WordPress Developer & International Business Expert"
              className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight neon-text-primary"
              type="words"
              once={false}
            />

            <AnimatedText
              text="Creating powerful digital experiences with global business insight"
              className="mb-8 text-lg sm:text-xl text-muted-foreground max-w-2xl"
              type="words"
              delay={0.5}
              once={false}
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button
                size="lg"
                onClick={() => navigateToSlide(1)}
                className="px-8 py-6 text-lg bg-primary/90 hover:bg-primary/100 shadow-glow"
              >
                <Lightbulb className="mr-2 h-5 w-5" />
                Explore My Work
              </Button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => navigateToSlide(1)}
              >
                <span className="mb-2 text-sm text-muted-foreground">
                  Scroll Down
                </span>
                <ArrowDown className="h-5 w-5 text-primary" />
              </motion.div>
            </motion.div>
          </div>

          {/* Floating animated elements */}
          <motion.div
            className="absolute right-[25%] bottom-[35%] text-primary/70"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          >
            <Code size={48} />
          </motion.div>

          <motion.div
            className="absolute left-[30%] top-[25%] text-primary/70"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          >
            <Globe size={42} />
          </motion.div>
        </SlideSection>

        {/* About Slide */}
        <SlideSection
          id="about"
          index={1}
          accentColor="secondary"
          bgColor="bg-gradient-to-b from-background to-secondary/5"
        >
          <div className="w-full max-w-6xl mx-auto">
            <AnimatedText
              text="About Me"
              className="text-4xl md:text-5xl font-bold mb-12 text-center neon-text-secondary"
              type="chars"
              once={false}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <GlowingIcon icon={<Code />} color="secondary" />
                  <h3 className="text-2xl font-semibold neon-text-secondary">
                    WordPress Developer
                  </h3>
                </div>

                <p className="text-lg">
                  With over 5 years of experience in WordPress development, I
                  specialize in creating custom themes, plugins, and WooCommerce
                  solutions that deliver exceptional user experiences and meet
                  business objectives.
                </p>

                <p className="text-lg">
                  My technical expertise includes PHP, JavaScript, React, and
                  deep knowledge of WordPress core, ensuring that every project
                  is built with performance, security, and scalability in mind.
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    "WordPress",
                    "PHP",
                    "JavaScript",
                    "React",
                    "WooCommerce",
                  ].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 rounded-full text-sm bg-secondary/20 border border-secondary"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      viewport={{ once: false }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(var(--secondary), 0.3)",
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <GlowingIcon icon={<Globe />} color="secondary" />
                  <h3 className="text-2xl font-semibold neon-text-secondary">
                    International Business Expert
                  </h3>
                </div>

                <p className="text-lg">
                  As an International Business student, I bring a unique global
                  perspective to web development projects, understanding the
                  nuances of cross-cultural communication and international
                  market requirements.
                </p>

                <p className="text-lg">
                  This dual expertise allows me to create websites that not only
                  function flawlessly but are also strategically aligned with
                  global business objectives and culturally appropriate for
                  diverse audiences.
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    "Global Markets",
                    "Cross-Cultural UX",
                    "Localization",
                    "International SEO",
                    "Market Research",
                  ].map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm bg-secondary/20 border border-secondary"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      viewport={{ once: false }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(var(--secondary), 0.3)",
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </SlideSection>

        {/* Skills Slide */}
        <SlideSection
          id="skills"
          index={2}
          accentColor="primary"
          bgColor="bg-gradient-to-b from-background to-primary/5"
        >
          <div className="w-full max-w-6xl mx-auto">
            <AnimatedText
              text="My Skills"
              className="text-4xl md:text-5xl font-bold mb-12 text-center neon-text-primary"
              type="chars"
              once={false}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* WordPress Skills */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <GlowingIcon icon={<Laptop />} color="primary" />
                  <h3 className="text-2xl font-semibold">
                    WordPress Development
                  </h3>
                </div>

                <div className="space-y-6">
                  {wordpressSkills.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </div>

              {/* Business Skills */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <GlowingIcon icon={<Briefcase />} color="primary" />
                  <h3 className="text-2xl font-semibold">Business Expertise</h3>
                </div>

                <div className="space-y-6">
                  {businessSkills.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SlideSection>

        {/* Projects Slide */}
        <SlideSection
          id="projects"
          index={3}
          accentColor="accent"
          bgColor="bg-gradient-to-b from-background to-accent/5"
        >
          <div className="w-full max-w-6xl mx-auto">
            <AnimatedText
              text="Featured Projects"
              className="text-4xl md:text-5xl font-bold mb-12 text-center neon-text-accent"
              type="chars"
              once={false}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  technologies={project.technologies}
                  link={project.link}
                  delay={index * 0.2}
                />
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: false }}
            >
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-accent/90 hover:bg-accent/100 shadow-glow-accent"
              >
                View All Projects
              </Button>
            </motion.div>
          </div>
        </SlideSection>

        {/* Services Slide */}
        <SlideSection
          id="services"
          index={4}
          accentColor="secondary"
          bgColor="bg-gradient-to-b from-background to-secondary/5"
        >
          <div className="w-full max-w-6xl mx-auto">
            <AnimatedText
              text="Services I Offer"
              className="text-4xl md:text-5xl font-bold mb-12 text-center neon-text-secondary"
              type="chars"
              once={false}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  color="secondary"
                  delay={index * 0.2}
                />
              ))}
            </div>

            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              viewport={{ once: false }}
            >
              <TestimonialsSlider />
            </motion.div>
          </div>
        </SlideSection>

        {/* Contact Slide */}
        <SlideSection
          id="contact"
          index={5}
          accentColor="primary"
          bgColor="bg-gradient-to-b from-background to-primary/5"
        >
          <div className="w-full max-w-6xl mx-auto">
            <AnimatedText
              text="Get In Touch"
              className="text-4xl md:text-5xl font-bold mb-12 text-center neon-text-primary"
              type="chars"
              once={false}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false }}
              >
                <h3 className="text-2xl font-semibold">Let's Work Together</h3>
                <p className="text-lg">
                  Whether you need a custom WordPress solution, WooCommerce
                  store, or international business consultation, I'm here to
                  help turn your vision into reality.
                </p>

                <div className="space-y-4">
                  <motion.div
                    className="flex items-center animated-border w-fit"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="font-medium mr-2">Email:</span>
                    <a
                      href="mailto:contact@example.com"
                      className="text-primary hover:text-glow"
                    >
                      contact@example.com
                    </a>
                  </motion.div>

                  <motion.div
                    className="flex items-center animated-border w-fit"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="font-medium mr-2">Location:</span>
                    <span>Global (Remote)</span>
                  </motion.div>
                </div>

                <div className="pt-8">
                  <h4 className="text-lg font-medium mb-4">Connect With Me</h4>
                  <SocialLinks />
                </div>
              </motion.div>

              <div className="bg-background/30 backdrop-blur-sm rounded-lg p-6 border border-primary shadow-glow">
                <ContactForm />
              </div>
            </div>

            {/* Footer */}
            <motion.footer
              className="mt-20 text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              viewport={{ once: false }}
            >
              <p>
                © {new Date().getFullYear()} WordPress Developer &
                International Business Expert. All rights reserved.
              </p>
            </motion.footer>
          </div>
        </SlideSection>
      </main>
    </div>
  );
}
