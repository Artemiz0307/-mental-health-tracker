export const detectDownwardTrends = (entries) => {
  if (!entries || entries.length < 3) return null;

  const last3 = entries.slice(-3);

  const moodDown =
    last3[0].mood_avg > last3[1].mood_avg &&
    last3[1].mood_avg > last3[2].mood_avg;

  const stressUp =
    last3[0].stress_avg < last3[1].stress_avg &&
    last3[1].stress_avg < last3[2].stress_avg;

  const sleepDown =
    last3[0].sleep_avg > last3[1].sleep_avg &&
    last3[1].sleep_avg > last3[2].sleep_avg;

  if (moodDown) {
    return {
      type: "mood",
      message:
        "Your mood has been trending down over the last few days. You might want to slow down and check in with yourself 🤍"
    };
  }

  if (stressUp) {
    return {
      type: "stress",
      message:
        "Your stress levels have been rising for a few days. Consider taking intentional breaks or reducing load 🌿"
    };
  }

  if (sleepDown) {
    return {
      type: "sleep",
      message:
        "Your sleep quality has declined recently. Prioritizing rest could really help right now 😴"
    };
  }

  return null;
};
