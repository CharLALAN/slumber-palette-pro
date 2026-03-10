import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ChevronRight } from "lucide-react";

const vibeConfig: Record<string, { emoji: string; label: string; color: string }> = {
  peaceful: { emoji: "☁️", label: "Peaceful", color: "bg-dream-peaceful/15 text-dream-peaceful" },
  nightmare: { emoji: "🌪️", label: "Nightmare", color: "bg-dream-nightmare/15 text-dream-nightmare" },
  lucid: { emoji: "💜", label: "Lucid", color: "bg-dream-lucid/15 text-dream-lucid" },
  adventure: { emoji: "⚡", label: "Adventure", color: "bg-dream-adventure/15 text-dream-adventure" },
  romantic: { emoji: "💕", label: "Romantic", color: "bg-dream-romantic/15 text-dream-romantic" },
};

const mockDreams = [
  {
    id: 1,
    title: "Glass City Under Moonlight",
    date: "Mar 9, 2026",
    vibe: "peaceful",
    snippet: "Floating through a city made of glass with moonlight reflections everywhere…",
    analysis: "This dream reflects a desire for clarity and transparency in your relationships. The moonlight suggests intuitive understanding, while the glass city represents fragile but beautiful structures you're building in your life. The floating sensation indicates a sense of peace with your current direction.",
  },
  {
    id: 2,
    title: "Chase Through the Labyrinth",
    date: "Mar 8, 2026",
    vibe: "nightmare",
    snippet: "Running through endless corridors with walls that kept shifting and changing…",
    analysis: "The labyrinth represents complex problems you're currently navigating. Being chased suggests avoidance of a particular issue. The shifting walls indicate that the 'rules' of a situation keep changing, making you feel disoriented. Consider what situation in your life feels unpredictable.",
  },
  {
    id: 3,
    title: "Flying Over the Ocean",
    date: "Mar 7, 2026",
    vibe: "lucid",
    snippet: "Realized I was dreaming and immediately took flight over turquoise waters…",
    analysis: "Achieving lucidity in a dream indicates strong self-awareness. Choosing to fly represents freedom and the ability to rise above challenges. The ocean below symbolizes your emotional depth — you're learning to observe your emotions from a healthy distance rather than being submerged in them.",
  },
  {
    id: 4,
    title: "Lost Temple Discovery",
    date: "Mar 6, 2026",
    vibe: "adventure",
    snippet: "Discovered a hidden temple in the jungle with golden inscriptions on the walls…",
    analysis: "Temples in dreams often represent the inner self or spiritual growth. The golden inscriptions suggest valuable wisdom waiting to be deciphered. The jungle setting implies this knowledge requires effort to reach. You may be on the verge of an important personal insight.",
  },
  {
    id: 5,
    title: "Dancing with Stars",
    date: "Mar 5, 2026",
    vibe: "romantic",
    snippet: "Was dancing in a ballroom among the stars with a mysterious partner…",
    analysis: "Dancing symbolizes harmony and connection. The cosmic setting elevates this to a universal experience of love and belonging. The mysterious partner may represent an aspect of yourself you're learning to embrace, or a deep longing for meaningful connection.",
  },
  {
    id: 6,
    title: "Underwater Garden",
    date: "Mar 4, 2026",
    vibe: "peaceful",
    snippet: "Walking through a garden beneath the sea, where flowers were made of light…",
    analysis: "An underwater garden combines emotional depth (water) with growth and beauty (garden). Flowers made of light suggest hope and creativity emerging from your subconscious. This is a deeply positive dream indicating emotional healing and creative inspiration.",
  },
];

export default function History() {
  const [selected, setSelected] = useState<typeof mockDreams[0] | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="max-w-4xl mx-auto px-4 py-6"
    >
      <h1 className="text-2xl font-bold mb-2">Dream History</h1>
      <p className="text-muted-foreground text-sm mb-6">Explore your recorded dreams and analyses</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDreams.map((dream, i) => {
          const vibe = vibeConfig[dream.vibe];
          return (
            <motion.button
              key={dream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(dream)}
              className="dream-card text-left group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${vibe.color}`}>
                  {vibe.emoji} {vibe.label}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{dream.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{dream.snippet}</p>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {dream.date}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Slide-over panel */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            />
            {/* Panel - slide from right on desktop, bottom on mobile */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] glass-strong z-50 p-6 overflow-y-auto hidden sm:block"
            >
              <PanelContent dream={selected} onClose={() => setSelected(null)} />
            </motion.div>
            {/* Bottom sheet on mobile */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 max-h-[85vh] glass-strong z-50 rounded-t-3xl p-6 overflow-y-auto sm:hidden"
            >
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-4" />
              <PanelContent dream={selected} onClose={() => setSelected(null)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PanelContent({ dream, onClose }: { dream: typeof mockDreams[0]; onClose: () => void }) {
  const vibe = vibeConfig[dream.vibe];
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${vibe.color}`}>
          {vibe.emoji} {vibe.label}
        </span>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={onClose}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <X className="h-5 w-5" />
        </motion.button>
      </div>
      <h2 className="text-xl font-bold mb-1">{dream.title}</h2>
      <p className="text-xs text-muted-foreground mb-6">{dream.date}</p>
      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Dream Recall</h4>
          <p className="text-sm leading-relaxed">{dream.snippet}</p>
        </div>
        <div className="h-px bg-border/50" />
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">AI Analysis</h4>
          <p className="text-sm leading-relaxed text-muted-foreground">{dream.analysis}</p>
        </div>
      </div>
    </div>
  );
}
