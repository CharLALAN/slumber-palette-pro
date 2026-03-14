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
    <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white/60 backdrop-blur-xl sticky top-0 z-50 shadow-sm shadow-sky-100/20">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-400">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-700">Dreamscape</span>
      </div>

      <nav className="flex items-center gap-1 bg-slate-100/60 rounded-full p-1.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink key={item.path} to={item.path} className="relative">
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-md shadow-sky-200/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full block transition-colors ${
                  isActive ? "text-slate-700" : "text-slate-500 hover:text-slate-700"
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
        className="p-2.5 rounded-xl bg-slate-100/80 hover:bg-sky-50 text-slate-500 hover:text-sky-500 transition-all duration-300"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </header>
  );
}

