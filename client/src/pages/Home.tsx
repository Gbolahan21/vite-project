import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <nav>
        <Link to="/signup" style={{ marginRight: "10px" }}>Register</Link>
        <Link to="/signin">Login</Link>
      </nav>
      <h1 className="text-4xl font-bold text-blue-500">Welcome to FullStack App</h1>
    </div>
  );
};

export default Home;