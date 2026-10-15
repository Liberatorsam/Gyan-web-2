import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/gyanData";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileSub, setOpenMobileSub] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-[0_1px_0_0_hsl(var(--border))] border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <nav className="container-gyan flex h-16 lg:h-20 items-center justify-between">
        <Logo variant={scrolled ? "dark" : "light"} />

        {/* Desktop nav */}
        <ul className="hidden xl:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setOpenDropdown(link.label)}
              onMouseLeave={() => link.children && setOpenDropdown(null)}
            >
              {link.to ? (
                <Link
                  to={link.to}
                  className={`px-3 py-2 text-[0.95rem] font-medium rounded-lg transition-colors flex items-center gap-1 ${
                    scrolled ? "text-foreground/80 hover:text-primary hover:bg-primary/5" : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  className={`px-3 py-2 text-[0.95rem] font-medium rounded-lg transition-colors flex items-center gap-1 ${
                    scrolled ? "text-foreground/80 hover:text-primary hover:bg-primary/5" : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </button>
              )}
              {link.children && (
                <AnimatePresence>
                  {openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full pt-2 w-64"
                    >
                      <div className="rounded-2xl border border-border bg-white p-2 shadow-xl shadow-black/5">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.to}
                            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/get-involved"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-onyx shadow-sm transition-all hover:shadow-md hover:brightness-105 active:scale-95"
          >
            Get Involved
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            className={`xl:hidden inline-flex items-center justify-center h-11 w-11 rounded-xl transition-colors ${
              scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden overflow-hidden bg-white border-t border-border"
          >
            <ul className="container-gyan py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to} className="block rounded-xl px-4 py-3 text-base font-medium text-foreground/85 hover:bg-primary/5 hover:text-primary">
                      {link.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-foreground/85 hover:bg-primary/5"
                        onClick={() => setOpenMobileSub(openMobileSub === link.label ? null : link.label)}
                      >
                        {link.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${openMobileSub === link.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {openMobileSub === link.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 overflow-hidden"
                          >
                            {link.children.map((child) => (
                              <Link key={child.label} to={child.to} className="block rounded-lg px-4 py-2.5 text-sm text-muted-foreground hover:text-primary">
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <Link to="/get-involved" className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-base font-semibold text-onyx">
                  Get Involved <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}