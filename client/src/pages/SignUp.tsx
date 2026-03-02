import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

import cyberLogo from '../assets/images/cyber.png';

function SignUp() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/signin");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-900 h-screen text-white overflow-hidden p-6 lg:px-8 relative isolate">
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
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full border-0 border-b border-gray-400 bg-transparent py-2 focus:outline-none focus:ring-0 focus:border-gray-400" />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-0 border-b border-gray-400 bg-transparent py-2 focus:outline-none focus:ring-0 focus:border-gray-400" />
        </div>

        <div className="relative mt-2">
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border-0 border-b border-gray-400 bg-transparent py-2 focus:outline-none focus:ring-0 focus:border-gray-400" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-200"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <IoEyeOffOutline size={20} /> : <MdOutlineRemoveRedEye size={20} />}
          </button>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer">Sign Up</button>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?
            <Link to="/signin" className="text-sm font-semibold ml-2 text-indigo-500 hover:text-indigo-400">
              Log In <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
