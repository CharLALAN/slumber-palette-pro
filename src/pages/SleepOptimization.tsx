import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, ChevronDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const sleepData = [
  { day: "Mon", hours: 7.2, quality: 82 },
  { day: "Tue", hours: 6.5, quality: 68 },
  { day: "Wed", hours: 8.1, quality: 91 },
  { day: "Thu", hours: 7.8, quality: 85 },
  { day: "Fri", hours: 6.0, quality: 55 },
  { day: "Sat", hours: 9.0, quality: 94 },
  { day: "Sun", hours: 8.5, quality: 90 },
];

const stageData = [
  { name: "Deep", value: 25, color: "hsl(217, 91%, 60%)" },
  { name: "Light", value: 40, color: "hsl(217, 91%, 80%)" },
  { name: "REM", value: 20, color: "hsl(271, 76%, 53%)" },
  { name: "Awake", value: 15, color: "hsl(220, 14%, 90%)" },
];

function generateDates() {
  const dates = [];
  const today = new Date();
  for (let i = -14; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}

const dates = generateDates();

export default function SleepOptimization() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  const isToday = (d: Date) =>
    d.toDateString() === new Date().toDateString();
  const isSelected = (d: Date) =>
    d.toDateString() === selectedDate.toDateString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="max-w-4xl mx-auto px-4 py-6"
    >
      <h1 className="text-2xl font-bold mb-2">Sleep Optimization</h1>
      <p className="text-muted-foreground text-sm mb-6">Track and improve your sleep patterns</p>

      {/* Date strip */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide -mx-4 px-4"
        style={{ scrollbarWidth: "none" }}
      >
        {dates.map((d, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedDate(d)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-2xl text-xs font-medium transition-all ${
              isSelected(d)
                ? "bg-primary text-primary-foreground shadow-dreamy"
                : isToday(d)
                ? "bg-primary/10 text-primary"
                : "bg-secondary/60 text-muted-foreground hover:bg-secondary"
            }`}
          >
            <span className="text-[10px] uppercase">
              {d.toLocaleDateString("en", { weekday: "short" })}
            </span>
            <span className="text-sm font-semibold">{d.getDate()}</span>
          </motion.button>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Avg Sleep", value: "7.6h", sub: "+0.3h vs last week" },
          { label: "Sleep Score", value: "85", sub: "Good" },
          { label: "Dreams", value: "12", sub: "This week" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="dream-card text-center"
          >
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs font-medium mt-1">{stat.label}</p>
            <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="dream-card">
          <h3 className="font-semibold text-sm mb-4">Sleep Duration</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sleepData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-[10px]" />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="hours" fill="hsl(217, 91%, 60%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="dream-card">
          <h3 className="font-semibold text-sm mb-4">Sleep Stages</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={stageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  dataKey="value"
                  strokeWidth={2}
                  stroke="hsl(var(--card))"
                >
                  {stageData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {stageData.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-muted-foreground">{s.name}</span>
                  <span className="font-semibold">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Privacy accordion */}
      <Accordion type="single" collapsible className="dream-card">
        <AccordionItem value="privacy" className="border-none">
          <AccordionTrigger className="hover:no-underline py-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-secondary">
                <Shield className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">Data Usage & Privacy</p>
                <p className="text-[10px] text-muted-foreground">Manage how your sleep data is used</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-3 pl-11">
              {[
                { label: "Share anonymized data for research", checked: true },
                { label: "Allow AI to learn from your patterns", checked: true },
                { label: "Show sleep data in community profile", checked: false },
              ].map((item, i) => (
                <label key={i} className="flex items-center justify-between text-sm cursor-pointer">
                  <span className="text-muted-foreground text-xs">{item.label}</span>
                  <PrivacyToggle defaultChecked={item.checked} />
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}

function PrivacyToggle({ defaultChecked }: { defaultChecked: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setOn(!on)}
      className={`w-10 h-6 rounded-full p-0.5 transition-colors ${on ? "bg-primary" : "bg-muted"}`}
    >
      <motion.div
        animate={{ x: on ? 16 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-5 h-5 bg-primary-foreground rounded-full shadow-sm"
      />
    </motion.button>
  );
}
