import { Moon, Sun, Sparkles } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { label: "Community", path: "/" },
  { label: "Dream Analysis", path: "/analyze" },
  { label: "History", path: "/history" },
  { label: "Sleep", path: "/sleep" },
];

interface TopNavProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function TopNav({ isDark, toggleTheme }: TopNavProps) {
  const location = useLocation();

  return (
    <header className="hidden md:flex items-center justify-between px-8 py-4 glass-strong sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold tracking-tight">Dreamscape</span>
      </div>

      <nav className="flex items-center gap-1 bg-secondary/60 rounded-full p-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink key={item.path} to={item.path} className="relative">
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-card rounded-full shadow-soft"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full block transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={toggleTheme}
        className="p-2.5 rounded-full bg-secondary hover:bg-accent transition-colors"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </header>
  );
}
