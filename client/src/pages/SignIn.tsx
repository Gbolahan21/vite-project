import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

import cyberLogo from '../assets/images/cyber.png';

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const res = await fetch("http://localhost:5000/auto-login", { credentials: "include" });
        const data = await res.json();
        if (res.ok) {
          navigate("/dashboard", { state: { username: data.username } });
        }
      } catch (err) {
        console.log("No remembered user", err);
      }
    };
    autoLogin();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rememberMe }),
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
    <div className="bg-gray-900 h-screen overflow-hidden text-white p-6 lg:px-8 relative isolate">
      <div
          aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>
      <div>
        <div className="flex lg:flex-1 mx-auto max-w-2xl">
          <Link to="/" className="-m-1.5 p-1.5 cursor-pointer">
            <img
              alt=""
              src={cyberLogo}
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mx-auto max-w-2xl sm:py-10 lg:py-10 py-10">
        <h1 className="text-2xl font-bold mb-6">Log In</h1>

        <p className="font-bold">Welcome back!</p>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-0 border-b border-gray-400 bg-transparent py-2 focus:outline-none focus:ring-0 focus:border-gray-400" required />
        </div>

        <div className="relative mt-2">
          <label>Password</label>
          <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} className="w-full border-0 border-b border-gray-400 bg-transparent py-2 focus:outline-none focus:ring-0 focus:border-gray-400" required />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-200"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <IoEyeOffOutline size={20} /> : <MdOutlineRemoveRedEye size={20} />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" id="rememberMe" onChange={(e) => setRememberMe(e.target.checked)} />
            <span className="text-sm">Remember me</span>
          </label>

          <a href="#" className="text-sm text-blue-500">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer">Log In</button>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Don't have an account?
            <Link to="/signup" className="text-sm font-semibold ml-2 text-indigo-500 hover:text-indigo-400">
              Sign Up <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
