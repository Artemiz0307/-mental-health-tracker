import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { addEntry, getEntries } from "../services/entriesService";
import { useAuth } from "../context/AuthContext";
import EmotionCapture from "../components/EmotionCapture";

/* -------------------- SLIDER COMPONENT -------------------- */
function Slider({ label, value, setValue }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-300">
        <span>{label}</span>
        <span className="font-semibold text-white">{value}</span>
      </div>

      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer
                   bg-white/10 accent-primary"
      />

      <div className="flex justify-between text-[11px] text-gray-500">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
}

/* -------------------- MAIN COMPONENT -------------------- */
export default function MoodInputForm() {
  const { user } = useAuth();

  const [mood, setMood] = useState(6);
  const [stress, setStress] = useState(5);
  const [sleep, setSleep] = useState(7);

  const [emotion, setEmotion] = useState(null); // ✅ FIX
  const [saving, setSaving] = useState(false);
  const [comparisonMsg, setComparisonMsg] = useState("");

  /* -------------------- AUTO-FILL FROM YESTERDAY -------------------- */
  useEffect(() => {
    if (!user) return;

    const loadYesterday = async () => {
      const entries = await getEntries(user.id);
      if (entries.length > 0) {
        const last = entries[entries.length - 1];
        setMood(last.mood);
        setStress(last.stress);
        setSleep(last.sleep);
      }
    };

    loadYesterday();
  }, [user]);

  /* -------------------- SAVE ENTRY -------------------- */
  const handleSave = async () => {
    if (!user) return;

    setSaving(true);

    await addEntry(user.id, {
      date: new Date().toISOString().split("T")[0],
      mood,
      stress,
      sleep,
      emotion: emotion?.label || null,
      emotion_confidence: emotion?.confidence || null,
    });

    if ("vibrate" in navigator) navigator.vibrate(30);

    const entries = await getEntries(user.id);

    if (entries.length >= 2) {
      const today = entries[entries.length - 1];
      const yesterday = entries[entries.length - 2];

      const todayScore = today.mood - today.stress + today.sleep;
      const yesterdayScore =
        yesterday.mood - yesterday.stress + yesterday.sleep;

      if (todayScore > yesterdayScore) {
        setComparisonMsg("You're doing better than yesterday 🌱");
      } else if (todayScore < yesterdayScore) {
        setComparisonMsg(
          "Today feels a bit heavier — be kind to yourself 🤍"
        );
      } else {
        setComparisonMsg("You're holding steady compared to yesterday 🧘");
      }
    } else {
      setComparisonMsg("First entry logged — nice start 💙");
    }

    setSaving(false);
  };

  /* -------------------- UI -------------------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-xl mx-auto"
    >
      <Slider label="Mood" value={mood} setValue={setMood} />
      <Slider label="Stress" value={stress} setValue={setStress} />
      <Slider label="Sleep Quality" value={sleep} setValue={setSleep} />

      {/* 🧠 Emotion Detection */}
      <EmotionCapture onDetect={setEmotion} />

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-3 rounded-xl text-white font-semibold
                   bg-gradient-to-r from-primary to-accent
                   hover:opacity-90 active:scale-[0.98]
                   transition disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Entry"}
      </button>

      {comparisonMsg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-300 bg-white/5
                     border border-white/10 rounded-xl p-3"
        >
          {comparisonMsg}
        </motion.div>
      )}
    </motion.div>
  );
}
