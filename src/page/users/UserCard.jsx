import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";

const UserCard = ({ user, onGiveKudos }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#2D2D2D",
        borderRadius: 3,
        border: "1px solid #E8ECEF",
        width: "100%",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          p: { xs: 2, md: 3 },
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#FFB400",
            width: { xs: 48, md: 56 },
            height: { xs: 48, md: 56 },
            mb: 2,
            fontSize: { xs: "1.5rem", md: "1.75rem" },
            fontWeight: 600,
          }}
        >
          {user.username.charAt(0).toUpperCase()}
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            mb: 0.5,
            color: "#2D2D2D",
          }}
        >
          {user.username}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#555",
            fontSize: { xs: "0.9rem", md: "1rem" },
          }}
        >
          {user.organization || "Not specified"}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", pb: { xs: 2, md: 3 } }}>
        <Button
          onClick={() => onGiveKudos(user)}
          variant="contained"
          sx={{
            backgroundColor: "#6C63FF",
            color: "#fff",
            "&:hover": { backgroundColor: "#5A54CC" },
            borderRadius: "20px",
            px: { xs: 2.5, md: 3 },
            fontSize: { xs: "0.9rem", md: "1rem" },
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Give Kudos
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;