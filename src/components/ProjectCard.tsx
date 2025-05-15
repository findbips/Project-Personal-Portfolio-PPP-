"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  delay?: number;
}

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  link,
  delay = 0,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg bg-background/30 backdrop-blur-sm border border-primary h-[300px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <motion.h3
          className="text-xl font-bold mb-2 neon-text-primary"
          animate={{
            y: isHovered ? -10 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        <motion.div
          className="flex flex-wrap gap-2 mb-3"
          animate={{
            opacity: isHovered ? 0 : 1,
            y: isHovered ? 10 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {technologies.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs border-primary text-primary"
            >
              {tech}
            </Badge>
          ))}
          {technologies.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs border-primary text-primary"
            >
              +{technologies.length - 3}
            </Badge>
          )}
        </motion.div>

        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="p-2 rounded-full bg-primary/20 border border-primary hover:shadow-glow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowDetails(true)}
          >
            <Code className="h-4 w-4 text-primary" />
          </motion.button>

          {link && (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-primary/20 border border-primary hover:shadow-glow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="h-4 w-4 text-primary" />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Details modal */}
      {showDetails && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-card w-full max-w-2xl rounded-lg border border-primary shadow-glow overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 neon-text-primary">
                {title}
              </h3>
              <p className="text-muted-foreground mb-6">{description}</p>

              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="border-primary text-primary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {link && (
                <div className="flex justify-end">
                  <motion.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary/20 border border-primary hover:shadow-glow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Visit Project</span>
                    <ExternalLink className="h-4 w-4" />
                  </motion.a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
