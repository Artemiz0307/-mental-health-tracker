export const rollingAverage = (entries, key, window = 7) => {
  if (!entries || entries.length === 0) return [];

  return entries.map((entry, index) => {
    const start = Math.max(0, index - window + 1);
    const slice = entries.slice(start, index + 1);

    const avg =
      slice.reduce((sum, e) => sum + (e[key] ?? 0), 0) / slice.length;

    return {
      ...entry,
      [`${key}_avg`]: Number(avg.toFixed(2))
    };
  });
};
