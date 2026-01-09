export const emotionMap = {
  happy: 0.0,
  neutral: 0.4,
  surprised: 0.3,
  sad: 0.7,
  angry: 0.9,
  fearful: 0.8,
  disgusted: 0.85,
};

export const encodeEmotion = (label, confidence = 1) => {
  if (!label) return 0.5; // fallback neutral-ish
  const base = emotionMap[label] ?? 0.5;
  return Math.min(1, Math.max(0, base * confidence));
};
