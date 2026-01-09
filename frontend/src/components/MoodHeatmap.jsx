const getLastNDays = (n = 90) => {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
};

const moodColor = (value) => {
  if (value == null) return "bg-white/5";
  if (value <= 3) return "bg-red-500/70";
  if (value <= 5) return "bg-orange-400/70";
  if (value <= 7) return "bg-yellow-400/70";
  return "bg-green-500/70";
};

export default function MoodHeatmap({ entries }) {
  const days = getLastNDays(84); // ~12 weeks

  const moodMap = {};
  entries.forEach(e => {
    moodMap[e.date] = e.mood;
  });

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">
        Mood Consistency
      </h3>

      <div className="overflow-x-auto">
        <div className="grid grid-rows-7 grid-flow-col gap-2 w-max">
          {days.map((date) => (
            <div
              key={date}
              title={`${date} — ${
                moodMap[date] != null ? `Mood: ${moodMap[date]}` : "No entry"
              }`}
              className={`w-4 h-4 rounded-sm ${moodColor(moodMap[date])}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4 text-xs text-gray-400">
        <span>Low</span>
        <div className="flex gap-1">
          <span className="w-3 h-3 bg-red-500/70 rounded-sm" />
          <span className="w-3 h-3 bg-orange-400/70 rounded-sm" />
          <span className="w-3 h-3 bg-yellow-400/70 rounded-sm" />
          <span className="w-3 h-3 bg-green-500/70 rounded-sm" />
        </div>
        <span>High</span>
      </div>
    </div>
  );
}
