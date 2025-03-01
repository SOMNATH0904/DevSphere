import { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/ServerHelpers";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Donation = () => {
  const [Item_names, setItemName] = useState("");
  const [Item_quantity, setItemQuantity] = useState("");
  const [Item_pics, setItemPic] = useState(null); 
  const [donor_name, setDonorName] = useState("");
  const [donor_email, setDonorEmail] = useState("");
  const [donor_phone, setDonorPhone] = useState("");
  const [donor_address, setDonorAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const submitDonation = async (e) => {
    e.preventDefault();

    if (!Item_pics) {
      setError("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("Item_names", Item_names);
    formData.append("Item_quantity", Item_quantity);
    formData.append("Item_pics", Item_pics); 
    formData.append("donor_name", donor_name);
    formData.append("donor_email", donor_email);
    formData.append("donor_phone", donor_phone);
    formData.append("donor_address", donor_address);

    console.log("Sending data to backend:", formData); 

    const response = await makeAuthenticatedPOSTRequest("/donate/", formData, true); 

    if (response.err) {
      setError("Could not create donation");
      return;
    }
    setSuccess("Donation created successfully!");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 p-6">
      <motion.div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Donation Form</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

        <form onSubmit={submitDonation} className="space-y-4">
          <InputField label="Item Name" value={Item_names} setValue={setItemName} type="text" />
          <InputField label="Item Quantity" value={Item_quantity} setValue={setItemQuantity} type="number" />
          
          {/* Image Upload Input */}
          <div>
            <label className="block text-gray-700 text-lg font-medium">Item Image:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setItemPic(e.target.files[0])} 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-md text-black"
              required 
            />
          </div>

          <InputField label="Donor Name" value={donor_name} setValue={setDonorName} type="text" />
          <InputField label="Donor Email" value={donor_email} setValue={setDonorEmail} type="email" />
          <InputField label="Donor Phone" value={donor_phone} setValue={setDonorPhone} type="text" />
          <InputField label="Donor Address" value={donor_address} setValue={setDonorAddress} type="text" />

          <motion.button 
            type="submit" 
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all">
            Donate Now
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
const InputField = ({ label, value, setValue, type }) => (
  <div>
    <label className="block text-gray-700 text-lg font-medium">{label}:</label>
    <input type={type} value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-md text-black" required />
  </div>
);

export default Donation;
