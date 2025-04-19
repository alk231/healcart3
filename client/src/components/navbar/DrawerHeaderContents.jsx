import { Box } from "@mui/material";
import { IconMenu2 as MenuIcon } from "@tabler/icons-react";
import CustomIconButton from "../../theme/customComponent/CustomIconButton";
import { IconSearch as SearchIcon } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const DrawerHeaderContents = ({ handleShowFullSearch, handleLeftDrawerToggle }) => {
	return (
    <>
      <Box sx={{ display: { xs: "none", sm: "none", md: "inline-block" } }}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#1e1e1e", // professional dark gray
            fontWeight: "600",
            fontSize: "20px",
            fontFamily: "Segoe UI, Roboto, sans-serif",
            gap: "10px",
          }}
        >
          <img
            src="/images/Logo.jpeg"
            alt="HealCart Logo"
            style={{
              height: "35px",
              width: "35px",
              borderRadius: "5px",
              objectFit: "cover",
            }}
          />
          <span>HealCart</span>
        </Link>
      </Box>
      <CustomIconButton onClick={handleLeftDrawerToggle}>
        <MenuIcon size={22} />
      </CustomIconButton>
      <CustomIconButton
        sx={{
          display: { xs: "flex", sm: "flex", md: "none" },
        }}
        onClick={handleShowFullSearch}
      >
        <SearchIcon size={22} />
      </CustomIconButton>
    </>
  );
};

export default DrawerHeaderContents;
