const express = require("express");
const {
  createReview,
  getReviews,
} = require("../controllers/reviewController");
const { verifyJWT } = require("../middlewares/jwtMiddleware");

const router = express.Router();

router.post("/create", verifyJWT, createReview); // Only logged-in NGOs
router.get("/:medicineId", getReviews); // Public

module.exports = router;
