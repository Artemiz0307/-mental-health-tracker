import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import joblib

# 1️⃣ Load dataset
df = pd.read_csv("mental_health_data.csv")

# 2️⃣ Define features
features = [
    "mood_avg",
    "stress_avg",
    "sleep_avg",
    "mood_trend",
    "stress_trend",
    "sleep_trend",
    "streak",
    "emotion_score"
]

X = df[features]
y = df["risk_label"]

# 3️⃣ Train / test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 4️⃣ Train model
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42
)
model.fit(X_train, y_train)

# 5️⃣ Evaluate
y_pred = model.predict(X_test)
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

print("Confusion Matrix:\n")
print(confusion_matrix(y_test, y_pred))

# 6️⃣ Save model
joblib.dump(model, "risk_model.pkl")
print("\n✅ Model saved as risk_model.pkl")
