import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { HomeOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { buttonStyles } from "../../utils/CustomStyles";

const FallbackUI = ({ resetErrorBoundary }) => {
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  const handleBackHome = () => {
    if (resetErrorBoundary) resetErrorBoundary();

    navigate("/");
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        px: 3,
        textAlign: "center",
      }}
    >
      {/* Message */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: "#2D2D2D",
            borderBottom: "1px solid #2D2D2D",
            textAlign: "left",
            paddingY: 2,
            marginBottom: 3,
            width: "100%",
          }}
        >
          404 - Oops :(
        </Typography>
        <Typography sx={{ color: "#2D2D2D", textAlign: "left" }}>
          We hit a bit of a snag while loading this page. But don&apos;t worry —
          it&apos;s not you, it&apos;s us.
        </Typography>
        <Typography mt={2} sx={{ color: "#2D2D2D", textAlign: "left" }}>
          Try refreshing the page, or head back home. We&apos;re working to fix
          the issue.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          mt={4}
        >
          <Button
            variant="contained"
            startIcon={<HomeOutlined />}
            onClick={handleBackHome}
            sx={buttonStyles}
          >
            Back to Home
          </Button>
          <Button
            variant="contained"
            startIcon={<RefreshOutlinedIcon />}
            onClick={handleReload}
            sx={buttonStyles}
          >
            Reload Page
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};


export default FallbackUI;
