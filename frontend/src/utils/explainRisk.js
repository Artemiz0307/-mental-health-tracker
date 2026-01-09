export const explainRisk = (features) => {
  const reasons = [];

  if (features.stress_avg >= 6) {
    reasons.push("higher-than-usual stress");
  }

  if (features.sleep_avg <= 6) {
    reasons.push("reduced sleep");
  }

  if (features.mood_avg <= 5) {
    reasons.push("lower mood levels");
  }

  if (features.stress_trend > 0.5) {
    reasons.push("rising stress trend");
  }

  if (features.sleep_trend < -0.5) {
    reasons.push("declining sleep pattern");
  }

  if (reasons.length === 0) {
    return "Your recent patterns look stable.";
  }

  return (
    "Risk is influenced by " +
    reasons.slice(0, 2).join(" and ") +
    "."
  );
};
