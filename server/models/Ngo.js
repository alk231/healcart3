const mongoose = require("mongoose");


const ngoSchema = new mongoose.Schema(
  {
    ngoName: { type: String, required: true },
    registrationId: { type: String, required: true },
    contactName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    medicineName: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    registrationDoc: { type: String, required: true }, // Store the file path or file URL here
    status: { type: String, default: "Pending" }, // Initial status set to "Pending"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ngo", ngoSchema);
