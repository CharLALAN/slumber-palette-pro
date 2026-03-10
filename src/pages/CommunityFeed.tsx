import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, MoreHorizontal, Trash2, Bookmark, Flag, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockPosts = [
  {
    id: 1,
    user: "Luna Starfield",
    initials: "LS",
    time: "2h ago",
    content: "Last night I dreamed I was floating through a city made entirely of glass. Every building reflected the moonlight, and I could hear soft music echoing through the streets. Has anyone else experienced these crystal cities?",
    reactions: { "😍": 12, "🌙": 8, "✨": 5 },
    comments: [
      { user: "Kai Rivers", initials: "KR", text: "Yes! I had a very similar dream last week. The glass buildings were singing!" },
      { user: "Nova Chen", initials: "NC", text: "Crystal cities are a common lucid dream motif. Try to touch the walls next time!" },
    ],
  },
  {
    id: 2,
    user: "Orion Blake",
    initials: "OB",
    time: "5h ago",
    content: "Dream journal day 47: I've started noticing recurring symbols — a golden key, a red door, and a white owl. My dream analysis says these represent unlocking hidden potential. Anyone else tracking symbols?",
    reactions: { "🔑": 15, "🦉": 9, "💡": 7 },
    comments: [
      { user: "Aria Moon", initials: "AM", text: "The owl is fascinating — it's often linked to wisdom from the subconscious." },
    ],
  },
  {
    id: 3,
    user: "Selene Frost",
    initials: "SF",
    time: "8h ago",
    content: "I finally achieved my first lucid dream! The moment I realized I was dreaming, I looked at my hands and they were glowing with soft blue light. The whole world became incredibly vivid. 🌟",
    reactions: { "🎉": 24, "💙": 18, "🌟": 11 },
    comments: [],
  },
];

const allEmojis = ["😍", "🌙", "✨", "🔑", "🦉", "💡", "🎉", "💙", "🌟", "😴", "💭"];

export default function CommunityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="max-w-2xl mx-auto px-4 py-6 space-y-5"
    >
      <h1 className="text-2xl font-bold mb-2">Community Feed</h1>
      <p className="text-muted-foreground text-sm mb-6">Share and explore dream experiences</p>
      {mockPosts.map((post, i) => (
        <PostCard key={post.id} post={post} index={i} />
      ))}
    </motion.div>
  );
}

function PostCard({ post, index }: { post: typeof mockPosts[0]; index: number }) {
  const [reactions, setReactions] = useState(post.reactions);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [deleted, setDeleted] = useState(false);

  if (deleted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="dream-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-primary/10">
            <AvatarFallback className="text-sm font-semibold text-primary bg-primary/10">
              {post.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{post.user}</p>
            <p className="text-xs text-muted-foreground">{post.time}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button whileTap={{ scale: 0.9 }} className="p-2 rounded-full hover:bg-secondary transition-colors">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-strong rounded-2xl border-border/50 min-w-[160px]">
            <DropdownMenuItem className="rounded-xl gap-2 cursor-pointer">
              <Bookmark className="h-4 w-4" /> Save Post
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl gap-2 cursor-pointer">
              <Flag className="h-4 w-4" /> Report
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-xl gap-2 cursor-pointer text-destructive focus:text-destructive"
              onClick={() => setDeleted(true)}
            >
              <Trash2 className="h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <p className="text-sm leading-relaxed mb-4">{post.content}</p>

      {/* Reactions */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        {Object.entries(reactions).map(([emoji, count]) => (
          <motion.button
            key={emoji}
            whileTap={{ scale: 1.3 }}
            onClick={() =>
              setReactions((r) => ({ ...r, [emoji]: (r as Record<string, number>)[emoji] + 1 }))
            }
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-xs font-medium transition-colors"
          >
            <span>{emoji}</span>
            <span className="text-muted-foreground">{count}</span>
          </motion.button>
        ))}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowEmojis(!showEmojis)}
            className="px-3 py-1.5 rounded-full bg-secondary/50 hover:bg-secondary text-xs transition-colors"
          >
            +
          </motion.button>
          <AnimatePresence>
            {showEmojis && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 4 }}
                className="absolute bottom-full mb-2 left-0 glass-strong rounded-2xl p-2 flex gap-1 z-10"
              >
                {allEmojis.map((e) => (
                  <motion.button
                    key={e}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => {
                      setReactions((r) => ({
                        ...r,
                        [e]: ((r as Record<string, number>)[e] || 0) + 1,
                      }));
                      setShowEmojis(false);
                    }}
                    className="text-lg p-1 hover:bg-secondary rounded-lg transition-colors"
                  >
                    {e}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-4 pt-2 border-t border-border/40">
        <motion.button whileTap={{ scale: 0.9 }} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
          <Heart className="h-4 w-4" /> Like
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <MessageCircle className="h-4 w-4" /> {comments.length}
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
          <Share2 className="h-4 w-4" /> Share
        </motion.button>
      </div>

      {/* Comments */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3 pl-4 border-l-2 border-primary/20">
              {comments.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-3"
                >
                  <Avatar className="h-7 w-7 flex-shrink-0">
                    <AvatarFallback className="text-[10px] font-semibold bg-secondary text-muted-foreground">
                      {c.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-semibold">{c.user}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{c.text}</p>
                  </div>
                </motion.div>
              ))}
              <div className="flex gap-2 mt-2">
                <input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment…"
                  className="flex-1 text-xs bg-secondary/60 rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground"
                />
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => {
                    if (newComment.trim()) {
                      setComments([...comments, { user: "You", initials: "YO", text: newComment }]);
                      setNewComment("");
                    }
                  }}
                  className="p-2 rounded-xl bg-primary text-primary-foreground"
                >
                  <Send className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
