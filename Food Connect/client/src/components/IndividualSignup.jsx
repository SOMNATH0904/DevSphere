import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import api from "../utils/api";
import { motion } from "framer-motion";

const IndividualSignup = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/individual/signup", {
        name,
        address,
        contact,
        email,
        password,
        aadharNumber,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/individual-login");
    } catch (error) {
      setError("Signup failed. Please check your details and try again.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="register-form-container bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-xl"
    >
      <h2 className="text-white text-3xl font-bold text-center mb-4">Individual Signup</h2>
      {error && <div className="error text-red-500 text-center">{error}</div>}
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="form-group">
          <label htmlFor="name" className="text-white">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" className="text-white">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact" className="text-white">Contact Number:</label>
          <input
            type="number"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="text-white">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="text-white">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="aadharNumber" className="text-white">Aadhar Number:</label>
          <input
            type="number"
            id="aadharNumber"
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
            className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </motion.button>
      </form>
    </motion.div>
  );
};

export default IndividualSignup;
