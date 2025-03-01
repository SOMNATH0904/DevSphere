const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  donor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ngo_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Assigned when NGO approves
  Item_names: { type: String, required: true },
  Item_quantity: { type: Number, required: true },
  Item_pics: {
    data: Buffer,
    contentType: String,
  },
  donor_name: { type: String, required: true },
  donor_email: { type: String, required: true },
  donor_phone: { type: String, required: true },
  donor_address: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved"], default: "pending" } // Track approval
}, { timestamps: true });

const Donate = mongoose.model("Donate", DonationSchema);
module.exports = Donate;
