import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { username?: string };
  const username = state?.username || "User";

  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {

    try {

      await fetch("http://localhost:5000/logout", {
        method: "POST"
      });

      navigate("/signin", { replace: true });

    } catch (error) {

      console.error(error);

    }

  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Welcome, {username}</h1>

      <button onClick={() => setShowModal(true)}>
        Logout
      </button>

      {/* Logout Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              textAlign: "center",
              minWidth: "300px"
            }}
          >
            <h3>Logout</h3>

            <p>Are you sure you want to logout?</p>

            <div style={{ marginTop: "15px" }}>
              <button
                onClick={handleLogout}
                style={{ marginRight: "10px" }}
              >
                Yes
              </button>

              <button
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;