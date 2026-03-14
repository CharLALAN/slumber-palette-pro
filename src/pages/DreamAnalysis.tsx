import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Moon, Mic, MicOff, Wand2, ImageIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const stylePresets = [
  { id: "surreal", label: "Surreal" },
  { id: "watercolor", label: "Watercolor" },
  { id: "cosmic", label: "Cosmic" },
  { id: "ethereal", label: "Ethereal" },
];

// Morning breeze animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const floatVariants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      ease: "easeInOut" as const,
      repeat: Infinity,
    },
  },
};

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
      setTimeout(() => {
        setText((t) => t + (t ? " " : "") + "I was floating through a shimmering aurora in the night sky...");
        setIsRecording(false);
      }, 2500);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-10">
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="inline-flex p-5 rounded-full bg-gradient-to-br from-sky-100/80 to-indigo-100/80 mb-5"
        >
          <Moon className="h-8 w-8 text-sky-500" />
        </motion.div>
        <h1 className="morning-heading text-3xl mb-3">Dream Analysis</h1>
        <p className="morning-text text-sm max-w-sm mx-auto">
          Describe your dream and let AI uncover its hidden meanings
        </p>
      </motion.div>

      {/* Input Card */}
      <motion.div variants={itemVariants} className="morning-card mb-6">
        <div className={`relative rounded-2xl transition-all duration-500 ${focused ? "morning-glow-focus" : "morning-glow"}`}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="I was walking through a forest of glowing trees, each one humming a different note..."
            rows={5}
            className="morning-input resize-none pr-14"
          />
          {/* Mic Button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={toggleRecording}
            className={`absolute bottom-4 right-4 p-3 rounded-xl transition-all duration-300 ${
              isRecording
                ? "bg-rose-400 text-white shadow-lg shadow-rose-200/50"
                : "bg-white/80 text-slate-400 hover:text-sky-500 hover:bg-sky-50"
            }`}
          >
            {isRecording ? (
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                <MicOff className="h-5 w-5" />
              </motion.div>
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </motion.button>
        </div>
        
        {isRecording && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-rose-500 font-medium mt-3 text-center flex items-center justify-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Listening... tap mic to stop
          </motion.p>
        )}
      </motion.div>

      {/* Image Generation Toggle */}
      <motion.div variants={itemVariants} className="morning-card mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-violet-500" />
            </div>
            <div>
              <p className="morning-heading text-sm">Generate Dream Image</p>
              <p className="text-xs text-slate-500 mt-0.5">Transform your dream into AI art</p>
            </div>
          </div>
          <Switch 
            checked={generateImage} 
            onCheckedChange={setGenerateImage}
            className="data-[state=checked]:bg-violet-400"
          />
        </div>

        {/* Art Style Picker */}
        <AnimatePresence>
          {generateImage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-slate-100">
                <p className="text-xs font-medium text-slate-500 mb-3">Choose art style</p>
                <div className="flex flex-wrap gap-2">
                  {stylePresets.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStyle(s.id)}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                        selectedStyle === s.id
                          ? "bg-gradient-to-r from-sky-400 to-indigo-400 text-white shadow-md shadow-sky-200/50"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Analyze Button */}
      <motion.div variants={itemVariants}>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAnalyze}
          disabled={analyzing || !text.trim()}
          className="morning-button w-full py-5 text-base"
        >
          {analyzing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
              <span>Analyzing your dream...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              <span>{generateImage ? "Analyze & Create Art" : "Analyze Dream"}</span>
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {analyzing && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 space-y-4"
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="morning-card h-20 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/3 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 animate-pulse" />
                  <div className="h-2.5 w-2/3 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {result && !analyzing && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 space-y-4"
          >
            {/* Emotional Theme */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="morning-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-sky-500" />
                </div>
                <h3 className="morning-heading text-base">Emotional Theme</h3>
              </div>
              <p className="morning-text text-sm">{result.emotion}</p>
            </motion.div>

            {/* Symbolism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="morning-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                </div>
                <h3 className="morning-heading text-base">Symbolism</h3>
              </div>
              <ul className="space-y-3">
                {result.symbols.map((s, i) => (
                  <li key={i} className="morning-text text-sm flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Interpretation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="morning-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                  <Moon className="h-5 w-5 text-indigo-500" />
                </div>
                <h3 className="morning-heading text-base">Interpretation</h3>
              </div>
              <p className="morning-text text-sm">{result.interpretation}</p>
            </motion.div>

            {/* Generated Image */}
            <AnimatePresence>
              {isGeneratingImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="morning-card py-12 text-center"
                >
                  <div className="relative w-20 h-20 mx-auto mb-5">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-2 border-dashed border-violet-300"
                    />
                    <div className="absolute inset-3 rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center">
                      <Wand2 className="h-6 w-6 text-violet-500" />
                    </div>
                  </div>
                  <p className="morning-heading text-sm">Painting your dream...</p>
                  <p className="text-xs text-slate-500 mt-1">{selectedStyle} style</p>
                </motion.div>
              )}

              {generatedImage && !isGeneratingImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="morning-card overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-pink-100 flex items-center justify-center">
                      <Wand2 className="h-5 w-5 text-fuchsia-500" />
                    </div>
                    <h3 className="morning-heading text-base">Dream Visualization</h3>
                  </div>
                  <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-violet-50 via-sky-50 to-pink-50 flex items-center justify-center border border-slate-100/50">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-violet-200/50 to-sky-200/50 flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-white/70" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">AI-Generated Dream Art</p>
                        <p className="text-xs text-slate-400 capitalize">{selectedStyle} aesthetic</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button className="morning-button-secondary flex-1 py-3">
                      Download
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
                      className="morning-button-secondary flex-1 py-3"
                    >
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
