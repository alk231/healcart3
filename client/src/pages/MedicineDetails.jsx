// pages/medicines/MedicineDetails.jsx
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Divider } from "@mui/material";
import Review from "../components/medicine/review/Review";
import { useViewSingleMedicineQuery } from "../features/medicines/medicinesSlice";

const MedicineDetails = () => {
  const { medicineId } = useParams();
  const { data, isLoading, error } = useViewSingleMedicineQuery(medicineId);

  const medicine = data?.medicine;
  if (isLoading) return <Typography>Loading medicine...</Typography>;
  if (error || !medicine)
    return <Typography>Error loading medicine</Typography>;

  return (
    <Box p={2}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {medicine.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {medicine.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manufacturer: {medicine.manufacturer}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ₹{medicine.price}
        </Typography>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* ✅ Inject the Reviews section here */}
      <Review medicineId={medicineId} />
    </Box>
  );
};

export default MedicineDetails;
