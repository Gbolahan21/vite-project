import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to dashboard
        navigate("/dashboard", { state: { username: data.username } });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <p>Welcome back!</p>
      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      <br />
      <label>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      <br />
      <button type="submit">Sign In</button>
      <p>Don't have an account yet <Link to="/signup">Sign Up</Link></p>
    </form>
  );
}

export default SignIn;