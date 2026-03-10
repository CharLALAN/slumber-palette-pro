import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Moon } from "lucide-react";

export default function DreamAnalysis() {
  const [text, setText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | typeof mockResult>(null);
  const [focused, setFocused] = useState(false);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(mockResult);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="max-w-2xl mx-auto px-4 py-6"
    >
      <div className="text-center mb-8">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="inline-flex p-4 rounded-full bg-primary/10 mb-4"
        >
          <Moon className="h-8 w-8 text-primary" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-2">Dream Analysis</h1>
        <p className="text-muted-foreground text-sm">Describe your dream and let AI uncover its meaning</p>
      </div>

      {/* Text area with glow */}
      <div className={`relative rounded-3xl transition-all duration-500 ${focused ? "glow-border-focus" : "glow-border"}`}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="I was walking through a forest of glowing trees, each one humming a different note…"
          rows={6}
          className="w-full bg-card/80 backdrop-blur-xl rounded-3xl p-6 text-sm leading-relaxed resize-none outline-none placeholder:text-muted-foreground/60 border border-border/30"
        />
      </div>

      {/* Analyze button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleAnalyze}
        disabled={analyzing || !text.trim()}
        className="mt-6 w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity relative overflow-hidden"
      >
        {analyzing ? (
          <>
            <div className="absolute inset-0 shimmer" />
            <Brain className="h-5 w-5 animate-pulse relative z-10" />
            <span className="relative z-10">Analyzing your dream…</span>
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Analyze Dream
          </>
        )}
      </motion.button>

      {/* Loading animation */}
      <AnimatePresence>
        {analyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 space-y-4"
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.3 }}
                className="dream-card"
              >
                <div className="h-3 w-3/4 rounded-full shimmer mb-3" />
                <div className="h-3 w-1/2 rounded-full shimmer" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && !analyzing && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-4"
          >
            <div className="dream-card">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-lg">🎭</span> Emotional Theme
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.emotion}</p>
            </div>
            <div className="dream-card">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-lg">🔮</span> Symbolism
              </h3>
              <ul className="space-y-2">
                {result.symbols.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="dream-card">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-lg">💡</span> Interpretation
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.interpretation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const mockResult = {
  emotion: "Your dream carries a strong sense of wonder and exploration. The glowing elements suggest a period of personal illumination and discovery in your waking life.",
  symbols: [
    "Forest — represents the subconscious mind and unexplored aspects of self",
    "Glowing trees — symbolize wisdom, enlightenment, and inner growth",
    "Music/humming — indicates harmony and emotional resonance",
  ],
  interpretation:
    "This dream suggests you're in a phase of deep self-discovery. The enchanted forest represents your inner world opening up to new insights. The fact that each tree hums a different note indicates multiple areas of your life are coming into harmony. Consider journaling about areas where you feel growth happening.",
};
