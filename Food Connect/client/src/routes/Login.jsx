import React from 'react'
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/ServerHelpers";
import { useCookies } from "react-cookie";
const Login=()=> {
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const login = async () => {
        const data = {Email, password};
        const response = await makeUnauthenticatedPOSTRequest(
            "/auth/login",
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
    }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
            <div className="p-5 border-b border-gray-700 w-full flex justify-center">
                <Icon icon="logos:food-donation" width="150" />
            </div>
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">To continue, log in to the Food Donation Portal.</h2>
                <input
                    type="email"
                    placeholder="Email address"
                    className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
                    onClick={(e) => {
                        e.preventDefault();
                        login();
                    }}
                >
                    LOG IN
                </button>
                <div className="w-full border-t border-gray-700 my-6"></div>
                <p className="text-center">Don't have an account?</p>
                <Link
                    to="/signup"
                    className="block text-center border border-gray-500 text-gray-300 hover:bg-gray-700 py-3 rounded-lg mt-4 font-bold transition"
                >
                    SIGN UP FOR FOOD DONATION
                </Link>
            </div>
        </div>
  )
}

export default Login