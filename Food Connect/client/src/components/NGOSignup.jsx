import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import api from "../utils/api";
import { motion } from "framer-motion";

const NGOSignup = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationAddress, setOrganizationAddress] = useState("");
  const [organizationContact, setOrganizationContact] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/ngo/signup", {
        Organization_Name: organizationName,
        Organization_Address: organizationAddress,
        Organization_Contact: organizationContact,
        Organization_Email: organizationEmail,
        password,
        GST_Number: gstNumber,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/ngo-login");
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
      <h2 className="text-white text-3xl font-bold text-center mb-4">NGO Signup</h2>
      {error && <div className="error text-red-500 text-center">{error}</div>}
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="form-group">
          <label htmlFor="organizationName" className="text-white">Organization Name:</label>
          <input
            type="text"
            id="organizationName"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="organizationAddress" className="text-white">Address:</label>
          <input
            type="text"
            id="organizationAddress"
            value={organizationAddress}
            onChange={(e) => setOrganizationAddress(e.target.value)}
            className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="organizationContact" className="text-white">Contact Number:</label>
          <input
            type="number"
            id="organizationContact"
            value={organizationContact}
            onChange={(e) => setOrganizationContact(e.target.value)}
            className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="organizationEmail" className="text-white">Email:</label>
          <input
            type="email"
            id="organizationEmail"
            value={organizationEmail}
            onChange={(e) => setOrganizationEmail(e.target.value)}
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
          <label htmlFor="gstNumber" className="text-white">GST Number:</label>
          <input
            type="number"
            id="gstNumber"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
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

export default NGOSignup;
