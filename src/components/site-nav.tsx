import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

type SiteNavProps = {
  variant?: "home" | "page";
};

export function SiteNav({ variant = "page" }: SiteNavProps) {
  const isHome = variant === "home";

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={
        isHome
          ? "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 md:px-12 md:py-5 mix-blend-difference text-white"
          : "sticky top-0 z-50 flex items-center justify-between border-b border-border/60 bg-background/80 px-4 py-4 backdrop-blur-md md:px-12 md:py-5"
      }
    >
      <Link
        to="/"
        hash="top"
        className="font-mono text-[10px] uppercase tracking-widest md:text-xs"
      >
        SC—
      </Link>
      <div className="hidden gap-8 font-mono text-xs uppercase tracking-widest md:flex">
        {isHome ? (
          <>
            <a href="#work" className="hover:opacity-60 transition-opacity">
              Work
            </a>
            <a href="#about" className="hover:opacity-60 transition-opacity">
              About
            </a>
            <Link to="/thoughts" className="hover:opacity-60 transition-opacity">
              Thoughts
            </Link>
            <a href="#contact" className="hover:opacity-60 transition-opacity">
              Contact
            </a>
          </>
        ) : (
          <>
            <Link to="/#work" className="hover:opacity-60 transition-opacity">
              Work
            </Link>
            <Link to="/#about" className="hover:opacity-60 transition-opacity">
              About
            </Link>
            <Link
              to="/thoughts"
              className="hover:opacity-60 transition-opacity"
            >
              Thoughts
            </Link>
            <Link to="/#contact" className="hover:opacity-60 transition-opacity">
              Contact
            </Link>
          </>
        )}
      </div>
      <a
        href="https://samuelchilinda.xyz"
        className="font-mono text-[10px] uppercase tracking-widest hover:opacity-60 md:text-xs"
      >
        ↗ .xyz
      </a>
    </motion.nav>
  );
}
