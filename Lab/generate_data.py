import random
import pandas as pd

ROWS = 500  # change to <= 500 if you want fewer

data = []

for _ in range(ROWS):
    mood_avg = round(random.uniform(2.5, 8.5), 2)
    stress_avg = round(random.uniform(2.5, 9.0), 2)
    sleep_avg = round(random.uniform(3.5, 8.5), 2)

    mood_trend = round(random.uniform(-1.5, 1.5), 2)
    stress_trend = round(random.uniform(-1.5, 1.5), 2)
    sleep_trend = round(random.uniform(-1.2, 1.2), 2)

    streak = random.randint(1, 30)

    # Emotion score (0 = positive, 1 = negative)
    emotion_score = round(random.uniform(0.1, 0.95), 2)

    # 🔴 Risk logic (THIS IS IMPORTANT)
    risk_score = (
        (7 - mood_avg) * 0.25 +
        stress_avg * 0.3 +
        (7 - sleep_avg) * 0.2 +
        emotion_score * 3 +
        max(stress_trend, 0) * 0.5
    )

    risk_label = 1 if risk_score >= 5 else 0

    data.append([
        mood_avg,
        stress_avg,
        sleep_avg,
        mood_trend,
        stress_trend,
        sleep_trend,
        streak,
        emotion_score,
        risk_label
    ])

df = pd.DataFrame(data, columns=[
    "mood_avg",
    "stress_avg",
    "sleep_avg",
    "mood_trend",
    "stress_trend",
    "sleep_trend",
    "streak",
    "emotion_score",
    "risk_label"
])

df.to_csv("mental_health_data.csv", index=False)

print("✅ mental_health_data.csv generated with", len(df), "rows")
