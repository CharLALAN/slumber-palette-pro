import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, MoreHorizontal, Trash2, Bookmark, Flag, Send, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Comment {
  user: string;
  initials: string;
  text: string;
  time: string;
}

interface Post {
  id: number;
  user: string;
  initials: string;
  time: string;
  content: string;
  likes: number;
  liked: boolean;
  image?: string;
  comments: Comment[];
}

const mockPosts: Post[] = [
  {
    id: 1,
    user: "Luna Starfield",
    initials: "LS",
    time: "2h ago",
    content: "Last night I dreamed I was floating through a city made entirely of glass. Every building reflected the moonlight, and I could hear soft music echoing through the streets. Has anyone else experienced these crystal cities?",
    likes: 24,
    liked: false,
    comments: [
      { user: "Kai Rivers", initials: "KR", text: "Yes! I had a very similar dream last week. The glass buildings were singing!", time: "1h ago" },
      { user: "Nova Chen", initials: "NC", text: "Crystal cities are a common lucid dream motif. Try to touch the walls next time!", time: "45m ago" },
    ],
  },
  {
    id: 2,
    user: "Orion Blake",
    initials: "OB",
    time: "5h ago",
    content: "Dream journal day 47: I've started noticing recurring symbols — a golden key, a red door, and a white owl. My dream analysis says these represent unlocking hidden potential. Anyone else tracking symbols?",
    likes: 31,
    liked: true,
    comments: [
      { user: "Aria Moon", initials: "AM", text: "The owl is fascinating — it's often linked to wisdom from the subconscious.", time: "3h ago" },
    ],
  },
  {
    id: 3,
    user: "Selene Frost",
    initials: "SF",
    time: "8h ago",
    content: "I finally achieved my first lucid dream! The moment I realized I was dreaming, I looked at my hands and they were glowing with soft blue light. The whole world became incredibly vivid.",
    likes: 53,
    liked: false,
    comments: [],
  },
];

const avatarColors: Record<string, string> = {
  LS: "from-amber-400 to-orange-500",
  OB: "from-rose-400 to-coral-500",
  SF: "from-yellow-400 to-amber-500",
  KR: "from-orange-400 to-rose-400",
  NC: "from-coral-400 to-orange-500",
  AM: "from-amber-400 to-yellow-400",
  YO: "from-primary to-primary",
};

export default function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const handleAddComment = (id: number, text: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, comments: [...p.comments, { user: "You", initials: "YO", text, time: "Just now" }] }
          : p
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Community</h1>
        <p className="text-muted-foreground text-sm">Share and explore dream experiences</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search dreams..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-secondary/60 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground"
        />
      </div>

      {/* Compose Box */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="dream-card mb-6"
      >
        <div className="flex items-start gap-3">
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarFallback className="text-xs font-semibold bg-gradient-to-br from-primary to-primary text-primary-foreground">
              YO
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-sm text-muted-foreground cursor-text rounded-xl bg-secondary/60 px-4 py-3">
              Share a dream experience...
            </div>
            <div className="flex items-center justify-end mt-3">
              <button className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                Post
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Feed */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {posts.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              index={i}
              onDelete={handleDelete}
              onLike={handleLike}
              onAddComment={handleAddComment}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function PostCard({
  post,
  index,
  onDelete,
  onLike,
  onAddComment,
}: {
  post: Post;
  index: number;
  onDelete: (id: number) => void;
  onLike: (id: number) => void;
  onAddComment: (id: number, text: string) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const colorClass = avatarColors[post.initials] || "from-primary to-primary";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 300, damping: 30 }}
      className="dream-card group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback
              className={`text-xs font-semibold bg-gradient-to-br ${colorClass} text-white`}
            >
              {post.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm leading-tight">{post.user}</p>
            <p className="text-xs text-muted-foreground">{post.time}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all"
            >
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl border-border/50 min-w-[150px]">
            <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer text-sm">
              <Bookmark className="h-4 w-4" /> Save
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer text-sm">
              <Flag className="h-4 w-4" /> Report
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-lg gap-2 cursor-pointer text-sm text-destructive focus:text-destructive"
              onClick={() => onDelete(post.id)}
            >
              <Trash2 className="h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <p className="text-sm leading-relaxed text-foreground/90 mb-5">{post.content}</p>

      {/* Action Bar */}
      <div className="flex items-center gap-1 pt-3 border-t border-border/40">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => onLike(post.id)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-secondary/80 transition-colors"
        >
          <motion.div
            animate={post.liked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`h-[18px] w-[18px] transition-colors ${
                post.liked ? "fill-red-500 text-red-500" : "text-muted-foreground"
              }`}
            />
          </motion.div>
          <span
            className={`text-xs font-medium ${
              post.liked ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            {post.likes}
          </span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-secondary/80 transition-colors ${
            showComments ? "bg-secondary/60" : ""
          }`}
        >
          <MessageCircle className="h-[18px] w-[18px] text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">{post.comments.length}</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-secondary/80 transition-colors ml-auto"
        >
          <Share2 className="h-[18px] w-[18px] text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Share</span>
        </motion.button>
      </div>

      {/* Comments */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3">
              {post.comments.map((c, i) => {
                const cColor = avatarColors[c.initials] || "from-muted to-muted";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex gap-3"
                  >
                    <Avatar className="h-7 w-7 flex-shrink-0 mt-0.5">
                      <AvatarFallback
                        className={`text-[10px] font-semibold bg-gradient-to-br ${cColor} text-white`}
                      >
                        {c.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-secondary/50 rounded-2xl px-3.5 py-2.5">
                      <div className="flex items-baseline gap-2">
                        <p className="text-xs font-semibold">{c.user}</p>
                        <p className="text-[10px] text-muted-foreground">{c.time}</p>
                      </div>
                      <p className="text-xs text-foreground/80 leading-relaxed mt-0.5">{c.text}</p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Comment Input */}
              <div className="flex gap-2 pt-1">
                <Avatar className="h-7 w-7 flex-shrink-0">
                  <AvatarFallback className="text-[10px] font-semibold bg-gradient-to-br from-primary to-primary text-primary-foreground">
                    YO
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newComment.trim()) {
                        onAddComment(post.id, newComment);
                        setNewComment("");
                      }
                    }}
                    placeholder="Write a reply..."
                    className="flex-1 text-xs bg-secondary/60 rounded-full px-4 py-2 outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground"
                  />
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => {
                      if (newComment.trim()) {
                        onAddComment(post.id, newComment);
                        setNewComment("");
                      }
                    }}
                    className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
