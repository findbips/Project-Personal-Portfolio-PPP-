"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ExternalLink, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string[];
  image: string;
  link?: string;
  technologies: string[];
  client?: string;
  year: number;
}

const ProjectShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Sample project data
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Website Redesign",
      description:
        "Complete redesign of an e-commerce platform with custom WooCommerce integration, payment gateways, and multilingual support.",
      category: ["WordPress", "WooCommerce", "AI Integration"],
      image:
        "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
      link: "https://example.com/project1",
      technologies: [
        "WordPress",
        "WooCommerce",
        "Custom Plugins",
        "Multilingual",
      ],
      client: "Global Retail Co.",
      year: 2023,
    },
    {
      id: 2,
      title: "Corporate Website",
      description:
        "Modern corporate website with custom post types, advanced filtering, and integration with CRM systems.",
      category: ["WordPress", "AI Integration"],
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
      technologies: ["WordPress", "Custom Theme", "API Integration"],
      client: "European Finance Group",
      year: 2022,
    },
    {
      id: 3,
      title: "Membership Portal",
      description:
        "Exclusive membership site with tiered access levels, payment processing, and member-only content areas.",
      category: ["WordPress", "WooCommerce"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      technologies: ["WordPress", "Membership Plugins", "Custom Development"],
      year: 2023,
    },
    {
      id: 4,
      title: "Multilingual Blog Platform",
      description:
        "Content-rich blog platform supporting multiple languages with custom taxonomy and advanced search functionality.",
      category: ["WordPress", "AI Integration"],
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
      technologies: ["WordPress", "WPML", "Custom Post Types"],
      client: "Asian Media Group",
      year: 2022,
    },
    {
      id: 5,
      title: "Online Course Platform",
      description:
        "Feature-rich learning management system with course creation, student management, and payment processing.",
      category: ["WordPress", "WooCommerce"],
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      technologies: ["WordPress", "LearnDash", "WooCommerce"],
      year: 2021,
    },
    {
      id: 6,
      title: "International Marketplace",
      description:
        "Multi-vendor marketplace supporting international shipping, multiple currencies, and vendor management.",
      category: ["WordPress", "WooCommerce", "AI Integration"],
      image:
        "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80",
      technologies: ["WordPress", "WooCommerce", "Multi-vendor Plugins"],
      client: "Global Trade Network",
      year: 2023,
    },
  ];

  // Filter projects based on selected category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" || project.category.includes(selectedCategory);
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Categories for filter buttons
  const categories = ["all", "WordPress", "WooCommerce", "AI Integration"];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <section
      id="projects"
      className="py-20 px-4 md:px-8 lg:px-16 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Project Showcase
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of AI-enhanced WordPress projects, from
            intelligent e-commerce solutions to smart corporate websites and
            automated platforms.
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground mr-1" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category === "all" ? "All Projects" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-lg bg-card border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.category.map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <Button
                    onClick={() => handleProjectClick(project)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    View Details
                  </Button>
                </div>

                {/* Hover overlay with quick actions */}
                <div className="absolute inset-0 bg-black/70 dark:bg-primary/10 dark:backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    onClick={() => handleProjectClick(project)}
                    variant="secondary"
                    className="mr-2"
                  >
                    View Details
                  </Button>
                  {project.link && (
                    <Button
                      variant="outline"
                      className="text-white border-white hover:bg-white/20"
                      onClick={() => window.open(project.link, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Site
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found matching your criteria.
            </p>
          </div>
        )}

        {/* Project Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedProject.client && (
                      <span className="block text-sm">
                        Client: {selectedProject.client} •{" "}
                        {selectedProject.year}
                      </span>
                    )}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                  <div className="rounded-lg overflow-hidden mb-6">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-medium mb-2">
                        About this project
                      </h4>
                      <p className="text-muted-foreground">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Close
                    </Button>
                    {selectedProject.link && (
                      <Button
                        onClick={() =>
                          window.open(selectedProject.link, "_blank")
                        }
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Project
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectShowcase;
