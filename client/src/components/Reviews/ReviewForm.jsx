import { useState } from "react";
import axios from "axios";

const ReviewForm = ({ medicineId, token }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/review/create`,
        { medicineId, rating, review },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Review submitted successfully");
      setRating(5);
      setReview("");
    } catch (error) {
      console.error("Review submission error:", error);
      alert(error?.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Write a Review</h4>
      <label>Rating:</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <br />
      <label>Review:</label>
      <br />
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={4}
        required
      />
      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
