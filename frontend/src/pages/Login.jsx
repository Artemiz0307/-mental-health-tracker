import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await login(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 to-slate-950">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl
                   border border-white/10 rounded-2xl p-6 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-sm text-gray-400 mt-1">
            Log in to continue tracking your mental health
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10
                          border border-red-500/20 rounded-lg p-2">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-black/40
                       border border-white/10 text-white
                       placeholder-gray-500 focus:outline-none
                       focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-black/40
                       border border-white/10 text-white
                       placeholder-gray-500 focus:outline-none
                       focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-purple-500 to-pink-500
                     hover:opacity-90 active:scale-[0.98]
                     transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
