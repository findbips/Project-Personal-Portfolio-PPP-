"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      // Reset form after success
      setTimeout(() => {
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setStatus("idle");
      }, 3000);
    }, 1500);
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.4)",
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
    blur: {
      scale: 1,
      boxShadow: "0 0 0 0px rgba(99, 102, 241, 0)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <motion.input
            id="name"
            type="text"
            className="w-full p-3 rounded-md border border-input bg-background/50 backdrop-blur-sm focus:outline-none"
            placeholder="Your Name"
            value={formState.name}
            onChange={handleChange}
            required
            variants={inputVariants}
            whileFocus="focus"
            initial="blur"
            animate="blur"
          />
        </motion.div>

        <motion.div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <motion.input
            id="email"
            type="email"
            className="w-full p-3 rounded-md border border-input bg-background/50 backdrop-blur-sm focus:outline-none"
            placeholder="your.email@example.com"
            value={formState.email}
            onChange={handleChange}
            required
            variants={inputVariants}
            whileFocus="focus"
            initial="blur"
            animate="blur"
          />
        </motion.div>
      </div>

      <motion.div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <motion.input
          id="subject"
          type="text"
          className="w-full p-3 rounded-md border border-input bg-background/50 backdrop-blur-sm focus:outline-none"
          placeholder="Project Inquiry"
          value={formState.subject}
          onChange={handleChange}
          required
          variants={inputVariants}
          whileFocus="focus"
          initial="blur"
          animate="blur"
        />
      </motion.div>

      <motion.div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <motion.textarea
          id="message"
          rows={5}
          className="w-full p-3 rounded-md border border-input bg-background/50 backdrop-blur-sm focus:outline-none"
          placeholder="Tell me about your project..."
          value={formState.message}
          onChange={handleChange}
          required
          variants={inputVariants}
          whileFocus="focus"
          initial="blur"
          animate="blur"
        />
      </motion.div>

      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          type="submit"
          className="w-full py-6 bg-primary/90 hover:bg-primary/100 shadow-glow"
          disabled={status === "submitting" || status === "success"}
        >
          {status === "idle" && (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}

          {status === "submitting" && (
            <>
              <motion.div
                className="mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              Sending...
            </>
          )}

          {status === "success" && (
            <>
              <Check className="mr-2 h-4 w-4" />
              Message Sent!
            </>
          )}

          {status === "error" && (
            <>
              <AlertCircle className="mr-2 h-4 w-4" />
              Error! Try Again
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;
