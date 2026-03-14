import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Moon, Mic, MicOff, Wand2, ImageIcon, RefreshCw, Download } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const stylePresets = [
  { id: "surreal", label: "Surreal" },
  { id: "watercolor", label: "Watercolor" },
  { id: "cosmic", label: "Cosmic" },
  { id: "ethereal", label: "Ethereal" },
];

export default function DreamAnalysis() {
  const [text, setText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | typeof mockResult>(null);
  const [focused, setFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [generateImage, setGenerateImage] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("surreal");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setGeneratedImage(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(mockResult);
      if (generateImage) {
        setIsGeneratingImage(true);
        setTimeout(() => {
          setIsGeneratingImage(false);
          setGeneratedImage("placeholder");
        }, 2000);
      }
    }, 3000);
  };

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setText((t) => t + (t ? " " : "") + "I was floating through a shimmering aurora in the night sky...");
        setIsRecording(false);
      }, 2500);
    }
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
          className="w-full bg-card/80 backdrop-blur-xl rounded-3xl p-6 pr-16 text-sm leading-relaxed resize-none outline-none placeholder:text-muted-foreground/60 border border-border/30"
        />
        {/* Mic button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={toggleRecording}
          className={`absolute bottom-4 right-4 p-3 rounded-2xl transition-all ${
            isRecording
              ? "bg-destructive text-destructive-foreground shadow-lg"
              : "bg-secondary hover:bg-accent text-muted-foreground"
          }`}
        >
          {isRecording ? (
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
              <MicOff className="h-5 w-5" />
            </motion.div>
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </motion.button>
      </div>

      {isRecording && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-destructive font-medium mt-2 text-center"
        >
          Listening... tap to stop
        </motion.p>
      )}

      {/* Generate Image Toggle */}
      <div className="mt-5 dream-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-dream-lucid/10 flex items-center justify-center">
            <ImageIcon className="h-4.5 w-4.5 text-dream-lucid" />
          </div>
          <div>
            <p className="text-sm font-semibold">Generate Dream Image</p>
            <p className="text-[11px] text-muted-foreground">Create AI art from your dream</p>
          </div>
        </div>
        <Switch checked={generateImage} onCheckedChange={setGenerateImage} />
      </div>

      {/* Art Style Picker (visible when toggle is on) */}
      <AnimatePresence>
        {generateImage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex flex-wrap gap-2">
              {stylePresets.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    selectedStyle === s.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            {generateImage ? "Analyze & Generate" : "Analyze Dream"}
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
                <Brain className="h-4 w-4 text-dream-lucid" /> Emotional Theme
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.emotion}</p>
            </div>
            <div className="dream-card">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-dream-adventure" /> Symbolism
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
                <Moon className="h-4 w-4 text-dream-peaceful" /> Interpretation
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.interpretation}</p>
            </div>

            {/* Generated Image Section */}
            <AnimatePresence>
              {isGeneratingImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="dream-card flex flex-col items-center py-12"
                >
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full bg-dream-lucid/20 animate-ping" />
                    <div className="absolute inset-2 rounded-full bg-dream-lucid/30 animate-pulse" />
                    <div className="absolute inset-4 rounded-full bg-dream-lucid/10 flex items-center justify-center">
                      <Wand2 className="h-6 w-6 text-dream-lucid" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">Painting your dream...</p>
                </motion.div>
              )}

              {generatedImage && !isGeneratingImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="dream-card space-y-4"
                >
                  <h3 className="font-semibold flex items-center gap-2">
                    <Wand2 className="h-4 w-4 text-dream-lucid" /> Dream Visualization
                  </h3>
                  <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-dream-lucid/10 via-primary/5 to-dream-peaceful/10 flex items-center justify-center border border-border/30">
                    <div className="text-center space-y-2">
                      <Sparkles className="h-10 w-10 text-primary/30 mx-auto" />
                      <p className="text-xs text-muted-foreground">AI-generated dream image</p>
                      <p className="text-[10px] text-muted-foreground/60 max-w-[200px] mx-auto capitalize">{selectedStyle} style</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 rounded-xl bg-secondary text-sm font-medium flex items-center justify-center gap-2 hover:bg-accent transition-colors">
                      <Download className="h-4 w-4" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsGeneratingImage(true);
                        setGeneratedImage(null);
                        setTimeout(() => {
                          setIsGeneratingImage(false);
                          setGeneratedImage("placeholder");
                        }, 2000);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-secondary text-sm font-medium flex items-center justify-center gap-2 hover:bg-accent transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Regenerate
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
