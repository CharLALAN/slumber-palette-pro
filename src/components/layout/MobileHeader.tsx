import { useState } from "react";
import { Moon, Sun, LogIn, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface MobileHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  language: string;
  toggleLanguage: () => void;
}

export default function MobileHeader({ isDark, toggleTheme, language, toggleLanguage }: MobileHeaderProps) {
  return (
    <header className="md:hidden flex items-center justify-end gap-2 px-4 py-3 sticky top-0 z-50 bg-white/70 backdrop-blur-xl">
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={toggleLanguage}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-amber-100/80 text-xs font-semibold text-amber-700 transition-colors"
      >
        <Globe className="h-3.5 w-3.5 text-amber-600" />
        {language}
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={toggleTheme}
        className="p-2.5 rounded-full bg-amber-100/80 text-amber-600 hover:text-orange-500 transition-colors"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.85 }}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 text-white text-xs font-semibold transition-colors shadow-md shadow-orange-200/50"
      >
        <LogIn className="h-3.5 w-3.5" />
        {language === "TH" ? "เข้าสู่ระบบ" : "Login"}
      </motion.button>
    </header>
  );
}
