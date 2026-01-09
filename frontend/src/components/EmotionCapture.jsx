import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function EmotionCapture({ onDetect }) {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [emotion, setEmotion] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]);
      setLoading(false);
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (loading) return;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
    });
  }, [loading]);

  const detectEmotion = async () => {
    if (!videoRef.current) return;

    const result = await faceapi
      .detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions();

    if (!result) return;

    const expressions = result.expressions;
    const topEmotion = Object.entries(expressions).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const detected = {
      label: topEmotion[0],
      confidence: topEmotion[1],
    };

    setEmotion(detected);
    onDetect(detected);
  };

  return (
    <div className="space-y-4 text-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full rounded-xl border border-white/10"
      />

      <button
        onClick={detectEmotion}
        className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20"
      >
        Analyze Emotion
      </button>

      {emotion && (
        <p className="text-sm text-gray-300">
          Detected emotion:{" "}
          <span className="font-semibold capitalize">
            {emotion.label}
          </span>{" "}
          ({Math.round(emotion.confidence * 100)}%)
        </p>
      )}
    </div>
  );
}
