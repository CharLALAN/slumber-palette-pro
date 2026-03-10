import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import TopNav from "@/components/layout/TopNav";
import MobileHeader from "@/components/layout/MobileHeader";
import BottomNav from "@/components/layout/BottomNav";
import CommunityFeed from "@/pages/CommunityFeed";
import DreamAnalysis from "@/pages/DreamAnalysis";
import History from "@/pages/History";
import SleepOptimization from "@/pages/SleepOptimization";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleLanguage = () => setLanguage((l) => (l === "EN" ? "TH" : "EN"));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <TopNav isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
            <MobileHeader isDark={isDark} toggleTheme={() => setIsDark(!isDark)} language={language} toggleLanguage={toggleLanguage} />
            <main className="flex-1 pb-24 md:pb-8">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<CommunityFeed />} />
                  <Route path="/analyze" element={<DreamAnalysis />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/sleep" element={<SleepOptimization />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </main>
            <BottomNav />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
