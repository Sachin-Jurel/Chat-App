import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://chatzy-bx9a.onrender.com/register", formData, {
        withCredentials: true,
      });
      const data = response.data.user;
      setUser(data);
      navigate("/user");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 mt-2 bg-gray-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-2 bg-gray-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-2 bg-gray-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
          >
            {" "}
            Signup
          </button>

          <p className="text-gray-400 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-blue-400 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
