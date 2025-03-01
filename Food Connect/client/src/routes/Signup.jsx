import React from 'react'
import {useState} from "react";
import {useCookies} from "react-cookie";
import {Icon} from "@iconify/react";
import {Link, useNavigate} from "react-router-dom";
import {makeUnauthenticatedPOSTRequest} from "../utils/ServerHelpers";
function Signup() {
    const [Name, setName] = useState("");
    const [Address, setAddress] = useState("");
    const [Contact, setContact] = useState("");
    const [Email, setEmail] = useState("");
    const [ConfirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [AadharNumber, setAadharNumber] = useState("");
    const [role, setRole] = useState("");
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    const signUp = async () => {
        if (Email !== ConfirmEmail) {
            alert(
                "Email and confirm email fields must match. Please check again"
            );
            return;
        }
        const data = {Name, Address, Contact, Email, password, AadharNumber, role};
        
        
        const response = await makeUnauthenticatedPOSTRequest(
            "/auth/register",
            data
        );
        if (response && !response.err) {
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, {path: "/", expires: date});
            alert("Success");
            navigate("/");
        } else {
            alert("Failure");
        }
    };

    return (
        
        <div className="absolute top-0 left-0 w-full h-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 relative overflow-hidden w-full">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden w-full">
                <div className="absolute w-96 h-96 bg-gradient-to-r from-green-500/20 to-transparent rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center w-full">
                <div className="p-5 border-b border-gray-700/50 w-full flex justify-center backdrop-blur-sm">
                    <Icon 
                        icon="logos:food-donation" 
                        width="150" 
                        className="drop-shadow-xl hover:scale-105 transition-transform duration-300" 
                    />
                </div>
                
                <div className="w-full  bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl shadow-gray-950/50 mt-8 border border-gray-700/50">
                    <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                        Join Food Donation Network
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-3 bg-gray-700/50 text-white rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                value={Name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                className="w-full p-3 bg-gray-700/50 text-white rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                value={Address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Contact Number"
                                className="w-full p-3 bg-gray-700/50 text-white rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                value={Contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </div>
                        
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full p-3 bg-gray-700/50 text-white rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Confirm Email"
                                className="w-full p-3 bg-gray-700/50 text-white rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                value={ConfirmEmail}
                                onChange={(e) => setConfirmEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 bg-gray-700/50 text-white rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <input
                            type="text"
                            placeholder="Aadhar Number"
                            className="w-full p-3 bg-gray-700/50 text-white rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                            value={AadharNumber}
                            onChange={(e) => setAadharNumber(e.target.value)}
                        />
                        <select
                            className="w-full p-3 bg-gray-700/50 text-white rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Select Role</option>
                            <option value="Resturent">Restaurant</option>
                            <option value="NGO">NGO</option>
                            <option value="Individual">Individual</option>
                        </select>
                    </div>

                    <button
                        className="w-full mt-8 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02] shadow-lg hover:shadow-green-500/20"
                        onClick={(e) => {
                            e.preventDefault();
                            signUp();
                        }}
                    >
                        Create Account
                    </button>

                    <div className="w-full border-t border-gray-700/50 my-6"></div>
                    
                    <p className="text-center text-gray-400">Already have an account?</p>
                    <Link
                        to="/login"
                        className="block text-center border border-gray-600/50 text-gray-300 hover:bg-gray-700/30 py-3 rounded-xl mt-4 font-bold transition-all hover:border-green-400/50"
                    >
                        Login to Your Account
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default Signup