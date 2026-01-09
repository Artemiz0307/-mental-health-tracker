from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
from typing import Optional

app = FastAPI(title="Mental Health Risk API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("risk_model.pkl")



class RiskInput(BaseModel):
    mood_avg: float
    stress_avg: float
    sleep_avg: float
    mood_trend: float
    stress_trend: float
    sleep_trend: float
    streak: int
    emotion_score: Optional[float] = 0.5


@app.post("/predict")
def predict(data: RiskInput):
    X = np.array([[
        data.mood_avg,
        data.stress_avg,
        data.sleep_avg,
        data.mood_trend,
        data.stress_trend,
        data.sleep_trend,
        data.streak,
        data.emotion_score
    ]])


    prob = model.predict_proba(X)[0][1]
    risk = int(prob >= 0.5)

    return {
        "risk": risk,
        "probability": float(prob)
    }
