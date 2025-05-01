import { useEffect, useState } from "react";
import axios from "axios";

const ReviewList = ({ medicineId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/review/${medicineId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [medicineId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((rev) => (
          <div key={rev._id} style={{ marginBottom: "1rem" }}>
            <strong>Rating:</strong> {rev.rating} ⭐<br />
            <strong>Review:</strong> {rev.review}
            <br />
            <small>By: {rev.user.ngoName || rev.user.email}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
