const asyncHandler = require("express-async-handler");
const Review = require("../models/ReviewModel");
const Medicine = require("../models/MedicineModel");
const User = require("../models/UserModel"); // Assuming both NGO & normal user use this
const Ngo = require("../models/Ngo");

// Create a review (All authenticated users allowed)
exports.createReview = asyncHandler(async (req, res) => {
  const { rating, review, medicineId } = req.body;
	console.log(medicineId)
  const { id: userId } = req.decoded;

  // Optional: Check if the medicine exists
  const medicine = await Medicine.findById(medicineId);
	console.log(medicine)
  if (!medicine) {
    res.status(404);
    throw new Error("Medicine not found.");
  }

  // Save the review
  const newReview = await Review.create({
    user: userId,
    medicine: medicineId,
    rating,
    review,
  });

  res.status(201).json({ message: "Review submitted", review: newReview });
});

// Get reviews for a specific medicine (visible to all)
exports.getReviews = asyncHandler(async (req, res) => {
  const { medicineId } = req.params;

  const reviews = await Review.find({ medicine: medicineId })
    .populate("user", "ngoName name email user_type") // Adjust fields as per model
    .sort({ createdAt: -1 });

  res.status(200).json(reviews);
});
