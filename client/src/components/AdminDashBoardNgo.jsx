import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const AdminDashBoardNgo = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/ngo/all`
        );
        setNgos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch NGOs", error);
        setLoading(false);
      }
    };

    fetchNgos();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        NGO Registrations
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : ngos.length === 0 ? (
        <Typography variant="body1">No NGO registrations found.</Typography>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>NGO Name</TableCell>
                <TableCell sx={{ color: "white" }}>Registration No.</TableCell>
                <TableCell sx={{ color: "white" }}>Contact</TableCell>
                <TableCell sx={{ color: "white" }}>Email</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ngos.map((ngo) => (
                <TableRow key={ngo._id} hover>
                  <TableCell>{ngo.ngoName}</TableCell>
                  <TableCell>{ngo.registrationId}</TableCell>
                  <TableCell>{ngo.contactName}</TableCell>
                  <TableCell>{ngo.email}</TableCell>
                  <TableCell
                    sx={{
                      color: ngo.status === "approved" ? "green" : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {ngo.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AdminDashBoardNgo;
