import { setDebugDate, clearDebugDate } from "../utils/time";
import { useState } from "react";

export default function DebugPanel() {
  const [date, setDate] = useState("");

  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
      <p className="text-sm font-semibold mb-2">Debug Time Control</p>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-black/30 p-2 rounded w-full mb-2"
      />

      <button
        onClick={() => setDebugDate(date)}
        className="w-full bg-purple-600 rounded p-2 mb-2"
      >
        Set App Date
      </button>

      <button
        onClick={clearDebugDate}
        className="w-full bg-gray-700 rounded p-2"
      >
        Reset to Today
      </button>

      <p className="text-[11px] text-gray-400 mt-2">
  App date: {localStorage.getItem("debug_date") || "today"}
</p>
    </div>
  );
}

