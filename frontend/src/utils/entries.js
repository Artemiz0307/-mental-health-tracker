import { getAppDateKey } from "./time";

export const saveEntry = (entry) => {
  const all = JSON.parse(localStorage.getItem("entries")) || [];

  // remove existing entry for same date
  const filtered = all.filter(e => e.date !== entry.date);

  localStorage.setItem(
    "entries",
    JSON.stringify([...filtered, entry])
  );
};

export const createTodayEntry = (data) => {
  saveEntry({
    ...data,
    date: getAppDateKey()
  });
};

export const getEntries = () => {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];

  // 🔥 THIS IS THE KEY FIX
  return entries.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
};
