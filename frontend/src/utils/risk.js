export const calculateRiskScore = (entries) => {
  if (!entries.length) return 0;

  const last7 = entries.slice(-7);
  const sampleFactor = Math.min(1, last7.length / 7);

  const avgMood =
    last7.reduce((a, b) => a + b.mood, 0) / last7.length;
  const avgStress =
    last7.reduce((a, b) => a + b.stress, 0) / last7.length;
  const avgSleep =
    last7.reduce((a, b) => a + b.sleep, 0) / last7.length;

  let rawScore =
    (10 - avgMood) * 12 +
    avgStress * 8 +
    Math.max(0, 7 - avgSleep) * 10;

  const scaledScore = rawScore * sampleFactor;

  return Math.min(100, Math.round(scaledScore));
};
