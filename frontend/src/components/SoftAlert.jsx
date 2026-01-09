import { motion } from "framer-motion";

export default function SoftAlert({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-yellow-500/10 border border-yellow-500/30
                 text-yellow-200 rounded-xl p-4 text-sm"
    >
      🚨 {message}
    </motion.div>
  );
}
