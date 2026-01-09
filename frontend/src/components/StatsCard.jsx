export default function StatsCard({
  title,
  value,
  subtitle,
  highlight = false
}) {
  return (
    <div
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5
      ${highlight ? "ring-1 ring-primary/40" : ""}`}
    >
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
      {subtitle && (
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
