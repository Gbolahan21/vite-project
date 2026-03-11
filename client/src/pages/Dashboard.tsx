import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Logout } from "../components";

const Dashboard: React.FC = () => {
  const location = useLocation();
  const state = location.state as { username?: string };
  const username = state?.username || "User";

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8 drop-shadow-lg">
        Welcome, {username}!
      </h1>

      <button
        onClick={() => setShowModal(true)}
        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all shadow-lg drop-shadow-md cursor-pointer"
      >
        Logout
      </button>

      <Logout isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Dashboard;