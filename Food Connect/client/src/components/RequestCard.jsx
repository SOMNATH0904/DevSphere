import React from "react";

const RequestCard = ({ request }) => {
  console.log("Rendering RequestCard with:", request); 

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
      <h3 className="text-xl font-semibold text-center mb-2">{request?.Item_names || "Unknown Item"}</h3>
      <p className="text-gray-600">Quantity: {request?.Item_quantity ?? "N/A"}</p>
      <p className="text-gray-600">Requester: {request?.requester_name ?? "N/A"}</p>
    </div>
  );
};

export default RequestCard;

