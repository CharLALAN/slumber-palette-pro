import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Sparkles, Download, RefreshCw } from "lucide-react";

const stylePresets = [
  { id: "surreal", label: "Surreal" },
  { id: "watercolor", label: "Watercolor" },
  { id: "cosmic", label: "Cosmic" },
  { id: "ethereal", label: "Ethereal" },
];

const galleryImages = [
  { id: 1, prompt: "A floating city made of glass under moonlight", style: "Surreal", placeholder: true },
  { id: 2, prompt: "Flying over infinite turquoise ocean at dawn", style: "Cosmic", placeholder: true },
  { id: 3, prompt: "A hidden temple in a bioluminescent jungle", style: "Ethereal", placeholder: true },
];

export default function DreamImageGen() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("surreal");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedImage("placeholder");
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="max-w-4xl mx-auto px-4 py-6 space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold mb-1">Dream Image Generator</h1>
        <p className="text-muted-foreground text-sm">Transform your dream descriptions into stunning visuals</p>
      </div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="dream-card space-y-4"
      >
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your dream in detail..."
            rows={4}
            className="w-full bg-secondary/50 rounded-2xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow placeholder:text-muted-foreground/60"
          />
        </div>

        {/* Style Presets */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Art Style</p>
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Generate Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-40 transition-opacity"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4" />
              Generate Image
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Result */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="dream-card flex flex-col items-center py-16"
          >
            <div className="relative w-20 h-20 mb-4">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-primary/30 animate-pulse" />
              <div className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Painting your dream...</p>
          </motion.div>
        )}

        {generatedImage && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dream-card space-y-4"
          >
            <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-primary/10 via-dream-lucid/10 to-dream-peaceful/10 flex items-center justify-center border border-border/30">
              <div className="text-center space-y-2">
                <Sparkles className="h-12 w-12 text-primary/40 mx-auto" />
                <p className="text-sm text-muted-foreground">AI-generated dream image</p>
                <p className="text-[11px] text-muted-foreground/60 max-w-xs mx-auto">{prompt}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2.5 rounded-xl bg-secondary text-sm font-medium flex items-center justify-center gap-2 hover:bg-accent transition-colors">
                <Download className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={handleGenerate}
                className="flex-1 py-2.5 rounded-xl bg-secondary text-sm font-medium flex items-center justify-center gap-2 hover:bg-accent transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h2 className="text-lg font-semibold mb-3">Recent Generations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              whileHover={{ y: -4 }}
              className="dream-card group cursor-pointer"
            >
              <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/5 via-dream-lucid/5 to-dream-peaceful/5 flex items-center justify-center mb-3 border border-border/20">
                <Sparkles className="h-8 w-8 text-muted-foreground/20 group-hover:text-primary/30 transition-colors" />
              </div>
              <p className="text-xs font-medium line-clamp-2 mb-1">{img.prompt}</p>
              <p className="text-[10px] text-muted-foreground">{img.style}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
