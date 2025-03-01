const express = require("express");
const router = express.Router();
const Donate = require("../models/donate"); // Update model name
const passport = require("passport");
const multer = require("multer");
const mongoose = require("mongoose");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a donation
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("Item_pics"),
  async (req, res) => {
    try {
      const user = req.user;
      if (user.role === "NGO") {
        console.log("NGO tried to donate");
        return res.status(403).json({ error: "Access denied. NGOs cannot donate." });
      }

      const {Item_names, Item_quantity, donor_name, donor_email, donor_phone, donor_address } = req.body;

      if (!Item_names || !Item_quantity || !donor_name || !donor_email || !donor_phone || !donor_address || !req.file) {
        return res.status(400).json({ error: "Please fill all required fields, including an image" });
      }

      const newDonation = await Donate.create({
        donor_id: user._id, 
        Item_names,
        Item_quantity,
        Item_pics: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
        donor_name,
        donor_email,
        donor_phone,
        donor_address,
      });

      return res.status(201).json({ message: "Donation created successfully!", donation: newDonation });

    } catch (error) {
      console.error("Error creating donation:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
);
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "NGO") {
      return res.status(403).json({ error: "Access denied. Only NGOs can view donations." });
    }

    const donations = await Donate.find({});

    if (!donations.length) {
      return res.status(404).json({ message: "No donations found" });
    }

    const formattedDonations = donations.map(donation => ({
      ...donation._doc,
      Item_pics: donation.Item_pics?.data
        ? `data:${donation.Item_pics.contentType};base64,${donation.Item_pics.data.toString("base64")}`
        : null
    }));

    res.status(200).json(formattedDonations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Server error" });
  }
});
router.put("/approve/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const user = req.user;
    
    if (user.role !== "NGO") {
      return res.status(403).json({ error: "Access denied. Only NGOs can approve donations." });
    }

    const donationId = req.params.id;
    const donation = await Donate.findById(donationId);

    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    if (donation.status === "approved") {
      return res.status(400).json({ error: "Donation is already approved" });
    }

    donation.status = "approved";
    donation.ngo_id = user._id;
    await donation.save();

    res.status(200).json({ message: "Donation approved successfully", donation });

  } catch (error) {
    console.error("Error approving donation:", error);
    return res.status(500).json({ error: "Server error" });
  }
});
router.delete("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const user = req.user;
    const donationId = req.params.id;
    const donation = await Donate.findById(donationId);

    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    if (donation.donor_id.toString() !== user._id.toString() && donation.ngo_id?.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Access denied. You can only delete your own donations." });
    }

    await donation.deleteOne();
    return res.status(200).json({ message: "Donation deleted successfully" });

  } catch (error) {
    console.error("Error deleting donation:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
