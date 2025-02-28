// pages/Home.jsx
import Header from '../components/Header';
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Community from '../components/Community';
import Contact from '../components/Contact';
import Footer from "../components/Footer";
function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <br />
      <br />
      <br /> 
      <br />
      <Hero />
      <Features />
      <Community />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
