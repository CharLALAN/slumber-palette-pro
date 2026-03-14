import { Moon, Sun, Sparkles } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { label: "Community", path: "/" },
  { label: "Analyze", path: "/analyze" },
  { label: "History", path: "/history" },
  { label: "Sleep", path: "/sleep" },
  { label: "Quests", path: "/gamification" },
];

interface TopNavProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function TopNav({ isDark, toggleTheme }: TopNavProps) {
  const location = useLocation();

  return (
    <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-sm shadow-orange-100/30">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-orange-400 via-coral-400 to-rose-400">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-amber-900">Dreamscape</span>
      </div>

      <nav className="flex items-center gap-1 bg-amber-100/60 rounded-full p-1.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink key={item.path} to={item.path} className="relative">
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-md shadow-orange-200/40"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full block transition-colors ${
                  isActive ? "text-amber-900" : "text-amber-700/80 hover:text-amber-900"
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
        className="p-2.5 rounded-xl bg-amber-100/80 hover:bg-orange-50 text-amber-600 hover:text-orange-500 transition-all duration-300"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </header>
  );
}

