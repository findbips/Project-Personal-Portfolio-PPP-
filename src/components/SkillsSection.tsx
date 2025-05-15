"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Code,
  Globe,
  ShoppingCart,
  Database,
  Palette,
  Users,
  Briefcase,
  LineChart,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  category: "wordpress" | "business";
}

const SkillsSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [animateSkills, setAnimateSkills] = useState(false);

  const skills: Skill[] = [
    // WordPress skills
    {
      name: "WordPress Development",
      level: 95,
      icon: <Code className="h-6 w-6" />,
      category: "wordpress",
    },
    {
      name: "WooCommerce",
      level: 90,
      icon: <ShoppingCart className="h-6 w-6" />,
      category: "wordpress",
    },
    {
      name: "Custom Plugin Development",
      level: 85,
      icon: <Database className="h-6 w-6" />,
      category: "wordpress",
    },
    {
      name: "Theme Customization",
      level: 92,
      icon: <Palette className="h-6 w-6" />,
      category: "wordpress",
    },

    // Business skills
    {
      name: "International Business",
      level: 88,
      icon: <Globe className="h-6 w-6" />,
      category: "business",
    },
    {
      name: "Client Management",
      level: 90,
      icon: <Users className="h-6 w-6" />,
      category: "business",
    },
    {
      name: "Project Management",
      level: 85,
      icon: <Briefcase className="h-6 w-6" />,
      category: "business",
    },
    {
      name: "Business Analytics",
      level: 80,
      icon: <LineChart className="h-6 w-6" />,
      category: "business",
    },
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      setTimeout(() => setAnimateSkills(true), 500);
    } else {
      controls.start("hidden");
      setAnimateSkills(false);
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const wordpressSkills = skills.filter(
    (skill) => skill.category === "wordpress",
  );
  const businessSkills = skills.filter(
    (skill) => skill.category === "business",
  );

  return (
    <section
      ref={ref}
      className="py-20 px-4 md:px-8 bg-background dark:bg-gradient-to-b dark:from-background dark:to-secondary/30"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            My Expertise
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Merging WordPress development with AI technologies and creative
            thinking to deliver intelligent, innovative solutions
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* WordPress Skills */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-semibold mb-6"
            >
              WordPress Development
            </motion.h3>
            <div className="space-y-8">
              {wordpressSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  custom={index}
                  className="space-y-2"
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-primary/10 p-2 rounded-full text-primary dark:bg-primary/20 dark:text-primary dark:shadow-glow">
                          {skill.icon}
                        </div>
                        <div className="flex justify-between w-full">
                          <h4 className="font-medium">{skill.name}</h4>
                          <span className="text-sm font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={animateSkills ? skill.level : 0}
                        className="h-2 transition-all duration-1000 ease-out dark:bg-secondary/50 dark:overflow-hidden dark:[&>div]:bg-primary"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Business Skills */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-semibold mb-6"
            >
              Business Expertise
            </motion.h3>
            <div className="space-y-8">
              {businessSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  custom={index}
                  className="space-y-2"
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-primary/10 p-2 rounded-full text-primary dark:bg-primary/20 dark:text-primary dark:shadow-glow">
                          {skill.icon}
                        </div>
                        <div className="flex justify-between w-full">
                          <h4 className="font-medium">{skill.name}</h4>
                          <span className="text-sm font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={animateSkills ? skill.level : 0}
                        className="h-2 transition-all duration-1000 ease-out dark:bg-secondary/50 dark:overflow-hidden dark:[&>div]:bg-primary"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
