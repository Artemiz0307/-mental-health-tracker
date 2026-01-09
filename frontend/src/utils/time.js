export const getAppDate = () => {
  const override = localStorage.getItem("debug_date");
  return override ? new Date(override) : new Date();
};

export const getAppDateKey = () => {
  const d = getAppDate();
  return d.toISOString().split("T")[0];
};

export const setDebugDate = (dateStr) => {
  localStorage.setItem("debug_date", dateStr);
};

export const clearDebugDate = () => {
  localStorage.removeItem("debug_date");
};
