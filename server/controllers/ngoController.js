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

exports.approveNgo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const ngo = await Ngo.findById(id);
  if (!ngo) {
    return res.status(404).json({ message: "NGO not found" });
  }

  ngo.status = "approved";
  await ngo.save();

  res.status(200).json({ message: "NGO approved", ngo });
});


