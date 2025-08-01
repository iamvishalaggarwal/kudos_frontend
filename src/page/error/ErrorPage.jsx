import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const ErrorPage = ({ message = "" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const errorMessage = location.state?.message || message || "";

  useEffect(() => {
    if (!errorMessage) {
      navigate("/");
    }
  }, [errorMessage, navigate]);

  return (
    <Box
      sx={{
        backgroundColor: "#464646",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
        color: "#e1e1e1",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0 0 10px 0",
            borderBottom: `1px solid #e1e1e1`,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: "#e1e1e1",
              textAlign: "left",
            }}
          >
            404 - Oops :(
          </Typography>
        </Box>
        <Typography sx={{ color: "#e1e1e1", textAlign: "left", pt: "20px" }}>
          {errorMessage}
        </Typography>
        <Box paddingTop="2rem">
          <Button
            variant="contained"
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
ErrorPage.propTypes = {
  message: PropTypes.string,
};

export default ErrorPage;
