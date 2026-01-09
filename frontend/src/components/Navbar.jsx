import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-5 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        MindTrack
      </h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/track">Track</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
