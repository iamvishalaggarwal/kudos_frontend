import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Backdrop,
  Box,
} from "@mui/material";
import Navbar from "../../components/header/Navbar";
import { useGetAllUsersQuery } from "../../features/auth/authApiSlice";
import UserCard from "./UserCard";
import GiveKudosDialog from "./GiveKudosDialog";

const Users = () => {
  const { data: users = [], isLoading } = useGetAllUsersQuery();
  const [selectedUser, setSelectedUser] = useState(null);

  if (isLoading) {
    return (
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#323232",
        }}
        open
      >
        <CircularProgress size={50} sx={{ color: "#fff" }} />
      </Backdrop>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: "#323232", minHeight: "calc(100vh - 64px)", p: 4 }}>
        <Typography variant="h5" gutterBottom color="#ffffff">
          Give Kudos to Your Teammates
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 2,
            py: 1,
          }}
        >
          {users.map((user) => (
            <UserCard key={user.id} user={user} onGiveKudos={setSelectedUser} />
          ))}
        </Box>
        <Grid container spacing={3}></Grid>

        {selectedUser && (
          <GiveKudosDialog
            open={!!selectedUser}
            onClose={() => setSelectedUser(null)}
            receiver={selectedUser}
          />
        )}
      </Box>
    </>
  );
};

export default Users;
