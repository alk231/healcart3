const asyncHandler = require("express-async-handler");
const Ngo = require("../models/Ngo");
const { uploadImageHandler } = require("../utils/uploadImage");// adjust path if needed



exports.registerNgo = asyncHandler(async (req, res) => {
  const { file, body } = req;

  console.log(file)

  let uploadedDoc = {};

  // Upload document to Cloudinary if present
  if (file) {
    uploadedDoc = await uploadImageHandler(file, "mediAid/medicines");
  }

  const newNgo = await new Ngo({
    ...body,
    registrationDoc: uploadedDoc.secure_url || defaultNgoDoc,
    cloudinaryId: uploadedDoc.public_id || "",
  }).save();

  console.log(newNgo)

  if (newNgo) {
    return res.status(201).json({
      msg: "ngo_registered",
      ngo: newNgo,
    });
  }

  res.status(500).json({
    msg: "ngo_not_registered",
    ngo: null,
  });
});

exports.getAllNgos = async (req, res) => {
  try {
    const ngos = await Ngo.find();
    res.status(200).json(ngos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch NGOs", error: error.message });
  }
};

exports.deleteNgo = asyncHandler(async (req, res) => {
  const ngoId = req.params.id;

  try {
    const deletedNgo = await Ngo.findByIdAndDelete(ngoId);

    if (!deletedNgo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    res.status(200).json({
      message: "NGO registration deleted successfully",
      ngo: deletedNgo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete NGO",
      error: error.message,
    });
  }
});

const sendEmail = require("../utils/sendEmail"); // You'll create this
const generateVerificationCode = () =>
  Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit random

exports.approveNgo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const ngo = await Ngo.findById(id);
  if (!ngo) {
    return res.status(404).json({ message: "NGO not found" });
  }

  if (ngo.status === "approved") {
    return res.status(400).json({ message: "NGO already approved" });
  }

  const verificationId = generateVerificationCode();

  ngo.status = "approved";
  ngo.verificationId = verificationId; // Add this field in your NGO model
  await ngo.save();

  // Email message
  const subject = "NGO Verification Approved ✅";
  const message = `
		Dear ${ngo.name},

		Congratulations! Your NGO registration has been approved.

		Your 5-digit verification ID is: ${verificationId}

		Please use this ID when applying for medicines.

		Thank you for your contribution!
	`;

  await sendEmail({
    to: ngo.email,
    subject,
    text: message,
  });

  res
    .status(200)
    .json({ message: "NGO approved and verification ID sent via email", ngo });
});

exports.verifyNgoId = asyncHandler(async (req, res) => {
  const { verificationId } = req.body;

  const ngo = await Ngo.findOne({ verificationId });
  if (!ngo || ngo.status !== "approved") {
    return res
      .status(404)
      .json({ message: "Invalid or inactive verification ID" });
  }

  res
    .status(200)
    .json({ message: "Valid NGO", ngoId: ngo._id, ngoName: ngo.name });
});


