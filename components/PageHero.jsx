import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Compact hero band used at the top of inner pages.
export default function PageHero({ eyebrow, title, description, image, crumb }) {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover opacity-25" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        </div>
      )}
      <div className="absolute inset-0 bg-grid opacity-[0.07]" />
      <div className="relative container-gyan py-16 sm:py-20 lg:py-24">
        <motion.nav
          className="flex items-center gap-1.5 text-sm text-white/70 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white">{crumb || title}</span>
        </motion.nav>
        {eyebrow && (
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span className="h-px w-8 bg-accent rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</span>
          </motion.div>
        )}
        <motion.h1
          className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 text-pretty leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px ascent-line" />
    </section>
  );
}