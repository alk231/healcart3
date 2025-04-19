import { Paper } from "@mui/material";
//import MedicineForm from "../components/medicine/MedicineForm";
import SectionTitle from "../components/SectionTitle";
import NgoRegistration from "../components/Ngo/NgoRegistration";

const Ngo = () => {
  return (
    <Paper component="section">
      <SectionTitle text="Ngo Registration" />
      <NgoRegistration isUpdateCase={false} donation={true} />
    </Paper>
  );
};

export default Ngo;
