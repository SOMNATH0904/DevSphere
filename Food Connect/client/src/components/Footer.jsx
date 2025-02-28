
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="top-0 left-0 w-screen bg-gray-900 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-lg font-semibold">About Us</h2>
            <p className="mt-2 text-gray-400">
              We aim to reduce food waste by connecting donors with NGOs. Join us in making a 
              difference by donating surplus food to those in need.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-white">Features</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Find Us</h2>
            <iframe
              className="mt-2 w-full h-32 rounded-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093707!2d144.96315761531558!3d-37.81362777975151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218cee17!2sMelbourne%20Central!5e0!3m2!1sen!2sau!4v1648378142824!5m2!1sen!2sau"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        </div>
        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-gray-400">© 2025 STUCKED-IN-TLE. All Rights Reserved.</p>
          <div className="mt-2">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white flex items-center justify-center gap-2"
            >
              <span>📷 Follow us on Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

