import React from "react";
import { Box, Button } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useNavigate } from "react-router-dom";
import { buttonStyles } from "../../utils/CustomStyles";

const colors = {
  primary: "#323232",
  button: {
    main: "#ff914d",
    hover: "#e67e22",
  },
};

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: colors.primary,
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0 0 20px 0",
            borderBottom: `1px solid #2D2D2D`,
            color: "#2D2D2D",
          }}
        >
          <Box fontSize="25px" fontWeight="600" py="10px" letterSpacing="2px">
            404 - Oops :(
          </Box>
          <Box color="#2D2D2D">
            Looks like the page you are trying to visit doesn&apos;t exist.
          </Box>
        </Box>
        <Box pt="20px" color="#2D2D2D">
          Maybe the page you are looking for was renamed, deleted, or might have
          never existed. Please check the URL and try again.
        </Box>
        <Box paddingTop="2rem">
          <Button
            variant="contained"
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => navigate("/")}
            sx={buttonStyles}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorPage;
