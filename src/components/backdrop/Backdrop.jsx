import React from "react";
import {
  Backdrop as MuiBackDrop,
  CircularProgress,
  Typography,
} from "@mui/material";

const Backdrop = ({ message = "Loading..." }) => {
  return (
    <MuiBackDrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "rgba(240, 240, 255, 0.9)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
      open
    >
      <CircularProgress size={60} sx={{ color: "#6C63FF" }} />
      <Typography variant="h6" sx={{ color: "#6C63FF" }}>
        {message}
      </Typography>
    </MuiBackDrop>
  );
};

export default Backdrop;
