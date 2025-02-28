import React, { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelpers";
import RequestCard from "../components/RequestCard";

const RequestPortal = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/request/");

        if (response?.error) {
          setError(response.error);
          return;
        }

        if (Array.isArray(response)) {
          setRequests(response);
        } else if (response?.data && Array.isArray(response.data)) {
          setRequests(response.data); 
        } else {
          console.warn("Unexpected response format:", response);
          setRequests([]);
        }
      } catch (err) {
        setError("Failed to fetch requests.");
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-400 to-purple-600 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-6">My Food Requests</h2>
      {loading && <p className="text-white text-lg">Loading food requests...</p>}
      {error && <p className="text-red-500 text-lg">{error}</p>}
      {!loading && requests.length === 0 && !error && (
        <p className="text-white text-lg">No food requests found.</p>
      )}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <RequestCard key={request._id} request={request} />
        ))}
      </div>
    </div>
  );
};

export default RequestPortal;
