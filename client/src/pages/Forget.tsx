import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Reset link sent to your email");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server error");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      
      <div className="w-96 p-8 border border-gray-600 rounded-lg">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-6">
            <label className="block text-sm mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full border-b border-gray-400 bg-transparent py-2 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-2 rounded"
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center text-sm">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}