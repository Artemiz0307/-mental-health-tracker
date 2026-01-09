export const generateWeeklyInsight = (entries) => {
  if (entries.length < 5) return null;

  const byDay = {};

  entries.forEach(e => {
    const day = new Date(e.date).toLocaleDateString("en-US", {
      weekday: "long"
    });
    byDay[day] = byDay[day] || { stress: 0, count: 0 };
    byDay[day].stress += e.stress;
    byDay[day].count++;
  });

  let worstDay = null;
  let highest = 0;

  for (const day in byDay) {
    const avg = byDay[day].stress / byDay[day].count;
    if (avg > highest) {
      highest = avg;
      worstDay = day;
    }
  }

  return `Your stress tends to spike on ${worstDay}s. Consider planning lighter days or breaks.`;
};
