import { MessageCircle, Brain, Clock, BarChart3, Trophy } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { label: "Feed", path: "/", icon: MessageCircle },
  { label: "Analyze", path: "/analyze", icon: Brain },
  { label: "History", path: "/history", icon: Clock },
  { label: "Sleep", path: "/sleep", icon: BarChart3 },
  { label: "Quests", path: "/gamification", icon: Trophy },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50 bg-white/85 backdrop-blur-xl rounded-3xl px-2 py-2 flex justify-around items-center shadow-lg shadow-orange-100/30 border border-orange-100/40">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const Icon = tab.icon;
        return (
          <NavLink key={tab.path} to={tab.path} className="relative flex-1">
            <motion.div
              whileTap={{ scale: 0.85 }}
              className={`flex flex-col items-center gap-1 py-2 rounded-2xl transition-colors ${
                isActive ? "text-orange-500" : "text-amber-400/80"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-pill"
                  className="absolute inset-1 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="h-5 w-5 relative z-10" />
              <span className="text-[10px] font-medium relative z-10">{tab.label}</span>
            </motion.div>
          </NavLink>
        );
      })}
    </nav>
  );
}
