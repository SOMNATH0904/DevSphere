import React, { useState, useEffect } from "react";
import DonationCard from "../components/DonationCard";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelpers";

const NgoPortal = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState(""); 

  useEffect(() => {
    const fetchDonations = async () => {
        try {
            const response = await makeAuthenticatedGETRequest("/donate/");
            console.log("API Response:", response);
      
            if (Array.isArray(response)) {
              setDonations(response); 
            } else {
              console.warn("Unexpected response format:", response);
              setDonations([]); 
            }
          } catch (err) {
            setError("Failed to fetch donations.");
            console.error("Error fetching donations:", err);
          }
    };

    fetchDonations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
        NGO Food Donations
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.length > 0 ? (
            donations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
            ))
        ) : (
            !error && <p className="text-gray-500 text-center col-span-3">No donations available.</p>
        )}
        </div>

    </div>
  );
};

export default NgoPortal;
