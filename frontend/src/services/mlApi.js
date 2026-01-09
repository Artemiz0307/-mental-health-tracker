import axios from "axios";

const ML_API_URL = "http://127.0.0.1:8000";

export const predictRisk = async (features) => {
  const res = await axios.post(`${ML_API_URL}/predict`, features);
  return res.data; // { risk, probability }
};
