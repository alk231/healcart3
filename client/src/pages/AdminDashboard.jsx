import { Paper } from "@mui/material";
//import MedicineForm from "../components/medicine/MedicineForm";
import SectionTitle from "../components/SectionTitle";
import AdminDashBoardNgo from "../components/AdminDashBoardNgo";
const AdminDashboard = () => {
  return (
    <Paper component="section">
      <SectionTitle text="AdminDashBoardNgo" />
      <AdminDashBoardNgo isUpdateCase={false} donation={true} />
    </Paper>
  );
};

export default AdminDashboard;
