// src/services/api.js
import axios from "axios";

const api = axios.create();

export const mockHistory = [
  { date: "2026-01-01", mood: 6, stress: 4, sleep_hours: 7 },
  { date: "2026-01-02", mood: 8, stress: 3, sleep_hours: 8 },
  { date: "2026-01-03", mood: 5, stress: 6, sleep_hours: 5 }
];

export default api;
