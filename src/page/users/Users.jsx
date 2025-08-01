import React, { useState, useMemo } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import Navbar from "../../components/header/Navbar";
import { useGetAllUsersQuery } from "../../features/auth/authApiSlice";
import UserCard from "./UserCard";
import GiveKudosDialog from "./GiveKudosDialog";
import Backdrop from "../../components/backdrop/Backdrop";
import { textFieldStyles } from "../../utils/CustomStyles";
import { SearchOutlined } from "@mui/icons-material";

const Users = () => {
  const { data: users = [], isLoading } = useGetAllUsersQuery();
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        (user.organization?.toLowerCase().includes(query) ?? false)
    );
  }, [users, searchQuery]);

  if (isLoading) {
    return <Backdrop />;
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          bgcolor: "#F8F9FF",
          minHeight: "calc(100vh - 65px)",
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{
              color: "#2D2D2D",
              mb: 1,
              fontSize: { xs: "2rem", md: "2.5rem" },
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            Give Kudos to Your Teammates
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#555",
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "0.9rem", md: "1rem" },
              textAlign: "center",
            }}
          >
            Acknowledge the hard work and contribution of your colleagues.
            Search and select a teammate below to give them a well-deserved
            kudos.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: { xs: 3, md: 4 },
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search by teammate's name or organization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ ...textFieldStyles, width: { md: "60%", xs: "100%" } }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchOutlined />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Grid container spacing={3}>
            {filteredUsers.length === 0 ? (
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#555",
                    textAlign: "center",
                    py: 2,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                  }}
                >
                  No teammates found matching your search.
                </Typography>
              </Grid>
            ) : (
              filteredUsers.map((user) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={user.id}>
                  <UserCard user={user} onGiveKudos={setSelectedUser} />
                </Grid>
              ))
            )}
          </Grid>

          {selectedUser && (
            <GiveKudosDialog
              open={!!selectedUser}
              onClose={() => setSelectedUser(null)}
              receiver={selectedUser}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

export default Users;
