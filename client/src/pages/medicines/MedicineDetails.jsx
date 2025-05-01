import ReviewList from "../components/Reviews/ReviewList";
import ReviewForm from "../components/Reviews/ReviewForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const MedicineDetails = () => {
  const { medicineId } = useParams();
  const { token } = useSelector((state) => state.auth);

  return (
    <div>
      <h2>Medicine Details Page</h2>
      {/* Medicine info can be added here */}
      <ReviewList medicineId={medicineId} />
      {token && <ReviewForm medicineId={medicineId} token={token} />}
    </div>
  );
};

export default MedicineDetails;
