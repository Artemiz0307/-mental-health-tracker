import { supabase } from "./supabase";

export const addEntry = async (userId, entry) => {
  const { error } = await supabase
    .from("daily_entries")
    .insert({
      user_id: userId,
      date: entry.date,
      mood: entry.mood,
      stress: entry.stress,
      sleep: entry.sleep,
      emotion: entry.emotion || null
    });

  if (error) throw error;
};

export const getEntries = async (userId) => {
  if (!userId) return []; // 👈 HARD GUARD

  const { data, error } = await supabase
    .from("daily_entries")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: true });

  if (error) throw error;
  return data || [];
};
