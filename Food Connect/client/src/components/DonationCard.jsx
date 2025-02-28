
import React, { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "./ui/button";
import { makeAuthenticatedDELETERequest, makeAuthenticatedPOSTRequest } from "../utils/ServerHelpers";

const DonationCard = ({ donation, onDonationDeleted }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentNgoId, setCurrentNgoId] = useState(null);

  // Fetch logged-in NGO's ID from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        if (parsedUser && parsedUser._id && parsedUser.role === "NGO") {
          setCurrentNgoId(parsedUser._id);
        } else {
          console.warn("User is not an NGO:", parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      console.warn("No user found in localStorage.");
    }
  }, []);
  

  const handleApprove = async () => {
    const { _id, donor_id, ngo_name = "Unknown NGO" } = donation;

    if (!_id || !currentNgoId || !donor_id) {
      console.error("Error: Missing donation details", { _id, currentNgoId, donor_id, ngo_name });
      alert("Invalid donation data! Some required fields are missing.");
      return;
    }

    try {
      setIsProcessing(true);

      // Delete the donation after approval
      const deleteResponse = await makeAuthenticatedDELETERequest(`/donate/${_id}`);
      if (deleteResponse?.error) {
        console.error("Delete Error:", deleteResponse.error);
        alert("Failed to delete donation!");
        return;
      }

      // Send a message to the donor
      const messageResponse = await makeAuthenticatedPOSTRequest("/message/send", {
        senderId: currentNgoId,
        receiverId: donor_id,
        messageText: `NGO ${ngo_name} has approved your donation and will pick it up soon.`,
      });

      if (messageResponse?.error) {
        console.error("Message Error:", messageResponse.error);
        alert("Failed to send message!");
        return;
      }

      onDonationDeleted?.(_id);
      alert("Donation approved and message sent successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Something went wrong!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img
        src={donation.Item_pics || "/placeholder-image.jpg"}
        alt={donation.Item_names || "Donation Item"}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{donation.Item_names}</h3>
      <p className="text-gray-600"><strong>Quantity:</strong> {donation.Item_quantity}</p>
      <p className="text-gray-600"><strong>Donor Name:</strong> {donation.donor_name}</p>
      <p className="text-gray-600"><strong>Phone:</strong> {donation.donor_phone}</p>
      <p className="text-gray-600"><strong>Address:</strong> {donation.donor_address || "N/A"}</p>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <motion.div whileHover={{ scale: isProcessing ? 1 : 1.1 }}>
          <Button
            className={`flex items-center gap-2 ${isProcessing ? "bg-gray-500" : "bg-green-600 text-white"}`}
            onClick={handleApprove}
            disabled={isProcessing}
          >
            <FaThumbsUp />
            {isProcessing ? "Processing..." : "Approve"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default DonationCard;

