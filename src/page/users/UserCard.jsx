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
        backgroundColor: "#444444",
        color: "#ffffff",
        borderRadius: 2,
        width: "20%",
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: "#ff914d" }}>
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6">{user.username}</Typography>
            <Typography variant="body2" color="#B0B0B0">
              {user.organization}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => onGiveKudos(user)}
          sx={{
            ml: "auto",
            backgroundColor: "#ff914d",
            color: "#fff",
            "&:hover": { backgroundColor: "#FF8C00" },
            borderRadius: "20px",
            px: 3,
          }}
          variant="contained"
        >
          Give Kudos
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
