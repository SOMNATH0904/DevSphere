
import React from 'react';
import FeatureCard from './FeatureCard';
import { FaDonate, FaHandsHelping } from 'react-icons/fa';
import { MdOutlineFoodBank } from 'react-icons/md';

const Features = () => {
  const features = [
    {
      icon: <FaDonate size={40} className="text-[#0c2c48] bg-[#e9eef3] mx-auto shadow-md shadow-[#bbd5cd] p-2 rounded-full" />,
      title: <span className="text-[#0c2c48] font-semibold">Easy Donations</span>,
      text: 'Restaurants and individuals can donate surplus food with just a few clicks.',
    },
    {
      icon: <FaHandsHelping size={40} className="text-[#0c2c48] bg-[#e4e7ea] mx-auto shadow-md shadow-[#8faba2] p-2 rounded-full" />,
      title: <span className="text-[#0c2c48] font-semibold">NGO Pickup</span>,
      text: 'Registered NGOs will collect food donations and ensure proper distribution.',
    },
    {
      icon: <MdOutlineFoodBank size={40} className="text-[#0c2c48] bg-[#e9ecee] mx-auto shadow-md shadow-[#8faba2] p-2 rounded-full" />,
      title: <span className="text-[#0c2c48] font-semibold">Reduce Food Waste</span>,
      text: 'Your contribution helps minimize food waste and supports the hungry.',
    },
  ];

  return (
    <section className="top-0 left-0 w-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 md:px-12 lg:px-24 py-12 bg-[#f5f6f6] text-[#0c2c48]">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </section>
  );
};

export default Features;
