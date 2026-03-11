import { motion } from "framer-motion";
import { Flame, Target, Trophy, Star, Zap, Shield, Eye, Sunrise, Moon, Compass } from "lucide-react";

const userStats = {
  level: 12,
  xp: 2840,
  xpToNext: 3500,
  totalDreams: 47,
  currentStreak: 7,
  longestStreak: 14,
  lucidCount: 8,
};

const achievements = [
  { id: 1, title: "First Dream", desc: "Log your first dream", icon: Star, earned: true, date: "Feb 12" },
  { id: 2, title: "Week Warrior", desc: "7-day logging streak", icon: Flame, earned: true, date: "Feb 28" },
  { id: 3, title: "Lucid Awakening", desc: "Record your first lucid dream", icon: Eye, earned: true, date: "Mar 3" },
  { id: 4, title: "Dream Analyst", desc: "Analyze 10 dreams with AI", icon: Zap, earned: true, date: "Mar 7" },
  { id: 5, title: "Night Owl", desc: "Log a dream past midnight", icon: Moon, earned: true, date: "Mar 1" },
  { id: 6, title: "Early Bird", desc: "Log a dream before 6 AM", icon: Sunrise, earned: false },
  { id: 7, title: "Explorer", desc: "Experience all 5 dream vibes", icon: Compass, earned: false },
  { id: 8, title: "Iron Will", desc: "30-day logging streak", icon: Shield, earned: false },
];

const badges = [
  { id: 1, label: "Dreamer Lv.1", color: "from-primary/80 to-primary", unlocked: true },
  { id: 2, label: "Streak Master", color: "from-dream-adventure/80 to-dream-adventure", unlocked: true },
  { id: 3, label: "Lucid Explorer", color: "from-dream-lucid/80 to-dream-lucid", unlocked: true },
  { id: 4, label: "Night Scholar", color: "from-dream-peaceful/80 to-dream-peaceful", unlocked: true },
  { id: 5, label: "Dream Sage", color: "from-dream-romantic/80 to-dream-romantic", unlocked: false },
  { id: 6, label: "Legend", color: "from-dream-nightmare/80 to-dream-nightmare", unlocked: false },
];

const challenges = [
  { id: 1, title: "Log 3 dreams this week", progress: 2, total: 3, xp: 150 },
  { id: 2, title: "Achieve a lucid dream", progress: 0, total: 1, xp: 300 },
  { id: 3, title: "Analyze 5 dreams with AI", progress: 3, total: 5, xp: 200 },
];

export default function Gamification() {
  const xpPercent = (userStats.xp / userStats.xpToNext) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="max-w-4xl mx-auto px-4 py-6 space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold mb-1">Gamification</h1>
        <p className="text-muted-foreground text-sm">Track your progress, earn XP, and unlock badges</p>
      </div>

      {/* XP & Level Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="dream-card relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Trophy className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Current Level</p>
            <p className="text-3xl font-bold">{userStats.level}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-muted-foreground">Total Dreams</p>
            <p className="text-lg font-semibold">{userStats.totalDreams}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{userStats.xp} XP</span>
            <span>{userStats.xpToNext} XP</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
            />
          </div>
          <p className="text-[11px] text-muted-foreground">{userStats.xpToNext - userStats.xp} XP to Level {userStats.level + 1}</p>
        </div>
      </motion.div>

      {/* Streaks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="dream-card text-center">
          <Flame className="h-8 w-8 text-dream-adventure mx-auto mb-2" />
          <p className="text-2xl font-bold">{userStats.currentStreak}</p>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>
        <div className="dream-card text-center">
          <Target className="h-8 w-8 text-dream-lucid mx-auto mb-2" />
          <p className="text-2xl font-bold">{userStats.longestStreak}</p>
          <p className="text-xs text-muted-foreground">Best Streak</p>
        </div>
      </motion.div>

      {/* Weekly Challenges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Zap className="h-5 w-5 text-dream-adventure" />
          Weekly Challenges
        </h2>
        <div className="space-y-3">
          {challenges.map((c) => {
            const pct = (c.progress / c.total) * 100;
            return (
              <div key={c.id} className="dream-card">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">{c.title}</p>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-dream-adventure/10 text-dream-adventure">
                    +{c.xp} XP
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-dream-adventure rounded-full"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium min-w-[40px] text-right">
                    {c.progress}/{c.total}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.04 }}
                className={`dream-card flex items-center gap-3 ${!a.earned ? "opacity-40" : ""}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  a.earned ? "bg-primary/10" : "bg-secondary"
                }`}>
                  <Icon className={`h-5 w-5 ${a.earned ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{a.title}</p>
                  <p className="text-[11px] text-muted-foreground">{a.desc}</p>
                </div>
                {a.earned && a.date && (
                  <span className="ml-auto text-[10px] text-muted-foreground shrink-0">{a.date}</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Shield className="h-5 w-5 text-dream-lucid" />
          Badges
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {badges.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              whileHover={{ scale: b.unlocked ? 1.05 : 1 }}
              className={`dream-card flex flex-col items-center py-6 ${!b.unlocked ? "opacity-30" : ""}`}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${b.color} flex items-center justify-center mb-3 ${
                b.unlocked ? "shadow-lg" : ""
              }`}>
                <Shield className="h-7 w-7 text-primary-foreground" />
              </div>
              <p className="text-xs font-semibold text-center">{b.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {b.unlocked ? "Unlocked" : "Locked"}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
