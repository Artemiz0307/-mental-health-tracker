import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, LineChart, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Track Your{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Mental Health
          </span>
        </h1>

        <p className="text-gray-300 text-lg mb-8">
          Log your mood, monitor stress, and visualize your mental wellbeing —
          all in one clean dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/track"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent shadow-lg hover:scale-105 transition"
          >
            Start Tracking
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-xl border border-white/20 backdrop-blur-xl hover:bg-white/10 transition"
          >
            View Dashboard
          </Link>
        </div>
      </motion.div>

      {/* FEATURES */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full"
      >
        <Feature
          icon={<Brain />}
          title="Daily Mood Logs"
          desc="Quick sliders to capture how you actually feel."
        />
        <Feature
          icon={<LineChart />}
          title="Trends & Insights"
          desc="See patterns over time with smooth charts."
        />
        <Feature
          icon={<Shield />}
          title="Risk Awareness"
          desc="AI-ready mental health risk scoring."
        />
      </motion.div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 transition">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
