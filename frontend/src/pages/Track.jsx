import MoodInputForm from "../components/MoodInputForm";
import { motion } from "framer-motion";

export default function Track() {
  return (
    <div className="min-h-screen px-4 py-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-xl mx-auto
                   bg-white/5 backdrop-blur-xl
                   border border-white/10
                   rounded-3xl p-6 sm:p-8"
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Daily Check-in
          </h2>
          <p className="text-sm text-gray-400">
            Take 30 seconds to reflect on how you feel today.
          </p>
        </div>

        {/* Form */}
        <MoodInputForm />
      </motion.div>
    </div>
  );
}
