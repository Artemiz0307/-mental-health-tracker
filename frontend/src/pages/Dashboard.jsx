import { useEffect, useState } from "react";
import TrendChart from "../components/TrendChart";
import StatsCard from "../components/StatsCard";
import RiskMeter from "../components/RiskMeter";
import SkeletonCard from "../components/SkeletonCard";
import SoftAlert from "../components/SoftAlert";

import { getEntries } from "../services/entriesService";
import { rollingAverage } from "../utils/rolling";
import { generateWeeklyInsight } from "../utils/insights";
import { detectDownwardTrends } from "../utils/alerts";
import { predictRisk } from "../services/mlApi";
import { explainRisk } from "../utils/explainRisk";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [smoothedHistory, setSmoothedHistory] = useState([]);
  const [mlRisk, setMlRisk] = useState(null);
  const [mlConfidence, setMlConfidence] = useState(null);
  const [riskExplanation, setRiskExplanation] = useState("");

  /* -------------------- LOAD DATA FROM SUPABASE -------------------- */
useEffect(() => {
  if (!user) {
    setLoading(false); // 👈 IMPORTANT
    return;
  }

  const load = async () => {
    try {
      const data = await getEntries(user.id);
      setHistory(data);
    } catch (err) {
      console.error("Failed to load entries:", err);
    } finally {
      setLoading(false);
    }
  };

  load();
}, [user]);


  /* -------------------- ROLLING AVERAGES -------------------- */
  useEffect(() => {
    if (history.length === 0) return;

    const withMood = rollingAverage(history, "mood");
    const withStress = rollingAverage(withMood, "stress");
    const withSleep = rollingAverage(withStress, "sleep");

    setSmoothedHistory(withSleep);
  }, [history]);

  /* -------------------- ML PREDICTION -------------------- */
  useEffect(() => {
    if (smoothedHistory.length < 3) return;

    const latest = smoothedHistory[smoothedHistory.length - 1];
    const prev =
      smoothedHistory[Math.max(0, smoothedHistory.length - 4)];

    const features = {
      mood_avg: latest.mood_avg,
      stress_avg: latest.stress_avg,
      sleep_avg: latest.sleep_avg,
      mood_trend: latest.mood_avg - prev.mood_avg,
      stress_trend: latest.stress_avg - prev.stress_avg,
      sleep_trend: latest.sleep_avg - prev.sleep_avg,
      streak: history.length
    };

    setRiskExplanation(explainRisk(features));

    predictRisk(features).then((res) => {
      setMlRisk(res.risk);
      setMlConfidence(res.probability);
    });
  }, [smoothedHistory]);

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

const daysCount = history.length;

const avgMood =
  daysCount > 0
    ? history.reduce((a, b) => a + b.mood, 0) / daysCount
    : null;

const avgStress =
  daysCount > 0
    ? history.reduce((a, b) => a + b.stress, 0) / daysCount
    : null;

const avgSleep =
  daysCount > 0
    ? (
        history.reduce((a, b) => a + b.sleep, 0) /
        daysCount
      ).toFixed(2)
    : null;

const streak = daysCount;


  const riskScore =
    mlRisk === null
      ? 0
      : mlRisk === 1
      ? Math.round(mlConfidence * 100)
      : Math.round((1 - mlConfidence) * 100);

  const alert = detectDownwardTrends(smoothedHistory);
  const insight = generateWeeklyInsight(history);

  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto">
      <p className="text-xs text-gray-400">
        Based on {history.length} day(s)
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Avg Mood"
          value={avgMood !== null ? avgMood.toFixed(1) : "—"}
          highlight
        />
        <StatsCard
          title="Avg Stress"
          value={avgStress !== null ? avgStress.toFixed(1) : "—"}
        />
        <StatsCard title="Sleep Avg" value={avgSleep ? `${avgSleep} hrs` : "—"} />
        <StatsCard title="🔥 Streak" value={`${streak} days`} />

      </div>

      {alert && mlRisk === 1 && mlConfidence >= 0.7 && (
        <SoftAlert message={alert.message} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center">
         {mlRisk === null ? (
              <p className="text-sm text-gray-400">Analyzing risk…</p>
            ) : (
              <RiskMeter score={riskScore} />
            )}

          {mlConfidence >= 0.7 && (
            <p className="text-xs text-gray-300 mt-3 text-center">
              {riskExplanation}
            </p>
          )}
        </div>

        {daysCount === 0 && (
          <div className="text-center text-gray-400 text-sm py-10">
            No data yet. Log your first day to see insights.
          </div>
        )}


        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
          <TrendChart label="Mood Trend" dataKey="mood_avg" color="#8b5cf6" data={smoothedHistory} />
          <TrendChart label="Stress Trend" dataKey="stress_avg" color="#ec4899" data={smoothedHistory} />
          <TrendChart label="Sleep Trend" dataKey="sleep_avg" color="#22c55e" data={smoothedHistory} />
        </div>
      </div>

      {insight && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300">
          🔔 {insight}
        </div>
      )}
    </div>
  );
}
