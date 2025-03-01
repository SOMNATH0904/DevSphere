



// components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import Button from './ui/button';
import { FaDonate, FaHandsHelping, FaCookie } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  const navigate = useNavigate(); 

  const handleDonateNowClick = () => {
    navigate('/donate');
  };

  const handleRequestNowClick = () => {
    navigate('/request');
  };

  return (

<section className="flex flex-col items-center text-center py-20 px-6 md:px-12 lg:px-24 bg-[#0a0f2c]">
<motion.h2
        className="text-4xl md:text-5xl font-bold text-[#e0e0ff] drop-shadow-[0_0_3px_#e0e0ff]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Donate Surplus Food & Help Those in Need
      </motion.h2>
      

      <motion.div
        className="text-gray-300 mt-4 max-w-2xl text-sm md:text-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
  <Typewriter
    words={[
      "Whether you're a restaurant or an individual, contribute to reducing food waste by donating surplus food.NGOs will pick it up and distribute it to those in need."
    ]}
    cursor
    cursorStyle="_"
    typeSpeed={15}  
    deleteSpeed={10}
  />
</motion.div>



<div className="flex flex-col md:flex-row gap-6 mt-6">
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button className="bg-[#e0e0ff] text-[#0a0f2c] flex items-center gap-2 shadow-s shadow-[#8faba2]" onClick={handleDonateNowClick}>
            <FaDonate /> Donate Money
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button className="bg-[#e0e0ff] text-[#0a0f2c] flex items-center gap-2 shadow-lg shadow-[#899b95]" onClick={handleDonateNowClick}>
            <FaCookie /> Donate Food
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button variant="outline" className="border-[#e0e0ff] text-[#e0e0ff] flex items-center gap-2 hover:bg-[#1bffb725]" onClick={handleRequestNowClick}>
            <FaHandsHelping /> Request Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
