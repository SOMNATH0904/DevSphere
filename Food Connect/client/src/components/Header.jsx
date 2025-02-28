
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelpers";
import { useCookies } from "react-cookie";

const Header = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/auth/profile");
        setUser(response?.data || response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, []);

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    localStorage.removeItem("token");
    setUser(null);
    alert("Logged out successfully");
  };

  return (
    <header className="fixed top-0 left-0 w-screen bg-[#0a0f2c] text-white shadow-md ">
      <nav className="w-full flex justify-between items-center px-8 py-4">
        <div className="text-2xl font-bold drop-shadow-[0_0_5px_#e0e0ff]">
          <Link to="/">Nourish Connect</Link>
        </div>

        <div className="md:hidden flex items-center" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <button className="text-white">
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>

        <div className="hidden md:flex gap-9 text-xl drop-shadow-[0_0_10px_#e0e0ff]">
          <Link to="/" className="hover:text-[#9a9e9f] transition duration-300">Home</Link>
          <Link to="/aboutus" className="hover:text-[#969999] transition duration-300">About Us</Link>
          <Link to="/contactus" className="hover:text-[#9d9e9e] transition duration-300">Contact Us</Link>
          <Link to="/features" className="hover:text-[#888a8b] transition duration-300">Features</Link>
          {user?.role === "NGO" && (
            <Link to="/ngo-portal" className="hover:text-[#00d9ff] transition duration-300">NGO Portal</Link>
          )}
        </div>

        <div className="flex gap-4 hidden md:flex">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold">{user?.Name ?? user?.name ?? "User"}</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-[#ff0000] text-white rounded-md border-2 border-[#ff0000] hover:bg-[#ff3333] hover:border-[#ff3333] transition duration-300">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
              <button className="px-4 py-2 bg-[#e0e0ff] text-[#0a0f2c] flex items-center gap-2 shadow-lg rounded-md border-2 border-[#e0e0ff] hover:bg-transparent hover:text-white transition duration-300">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 bg-[#e0e0ff] text-[#0a0f2c] flex items-center gap-2 shadow-lg rounded-md border-2 border-[#e0e0ff] hover:bg-transparent hover:text-white transition duration-300">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;