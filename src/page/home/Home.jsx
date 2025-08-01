import React, { useState } from "react";
import {
  Typography,
  Paper,
  CircularProgress,
  Container,
  Backdrop,
  Divider,
  Stack,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { useGetCurrentUserQuery } from "../../features/auth/authApiSlice";
import {
  useGetGivenKudosQuery,
  useGetReceivedKudosQuery,
} from "../../features/kudos/kudosApiSlice";
import Navbar from "../../components/header/Navbar";

const Home = () => {
  const [tabValue, setTabValue] = useState(0);

  const { data: userData, isLoading } = useGetCurrentUserQuery();
  const { data: receivedKudos = [], isLoading: isKudosLoading } =
    useGetReceivedKudosQuery();
  const { data: sentKudos = [], isLoading: isSentLoading } =
    useGetGivenKudosQuery();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const isAnyLoading = isLoading || isKudosLoading || isSentLoading;

  if (isAnyLoading)
    return (
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "#323232",
        }}
        open
      >
        <CircularProgress size={50} sx={{ color: "#fff" }} />
      </Backdrop>
    );

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: "#323232", minHeight: "calc(100vh - 64px)", py: 4 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{ color: "#FFFFFF", mb: 3, fontWeight: "bold" }}
          >
            Welcome, {userData?.username}
          </Typography>

          {/* ORG & KUDOS REMAINING */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 3,
              bgcolor: "#444444",
              borderRadius: 2,
              color: "#FFFFFF",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: "#ff914d" }}>
              Organization
            </Typography>
            <Typography>{userData?.organization}</Typography>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 3,
              bgcolor: "#444444",
              borderRadius: 2,
              color: "#FFFFFF",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: "#ff914d" }}>
              Kudos Remaining This Week
            </Typography>
            <Typography variant="h3" sx={{ color: "#ff914d" }}>
              {userData?.rem_kudos ?? 0}
            </Typography>
          </Paper>

          {/* TABS */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              bgcolor: "#444444",
              borderRadius: 2,
              color: "#FFFFFF",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="inherit"
              sx={{
                mb: 2,
                "& .MuiTabs-indicator": {
                  backgroundColor: "#ff914d",
                },
              }}
            >
              <Tab label="Received Kudos" />
              <Tab label="Sent Kudos" />
            </Tabs>
            <Divider sx={{ bgcolor: "#666666", mb: 2 }} />

            {/* RECEIVED TAB */}
            {tabValue === 0 && (
              <Stack spacing={2}>
                {receivedKudos.length === 0 ? (
                  <Typography color="#B0B0B0">
                    No kudos received yet. Share some love to get some back!
                  </Typography>
                ) : (
                  receivedKudos.map((kudo) => (
                    <Paper
                      key={kudo.id}
                      sx={{
                        p: 2,
                        bgcolor: "#555555",
                        color: "#FFFFFF",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ color: "#ff914d" }}
                      >
                        From: {kudo.sender.username}
                      </Typography>
                      <Typography>{kudo.message}</Typography>
                      <Typography variant="caption" color="#B0B0B0">
                        {new Date(kudo.timestamp).toLocaleString()}
                      </Typography>
                    </Paper>
                  ))
                )}
              </Stack>
            )}

            {/* SENT TAB */}
            {tabValue === 1 && (
              <Stack spacing={2}>
                {sentKudos.length === 0 ? (
                  <Typography color="#B0B0B0">
                    You haven't sent any kudos yet. Start appreciating!
                  </Typography>
                ) : (
                  sentKudos.map((kudo) => (
                    <Paper
                      key={kudo.id}
                      sx={{
                        p: 2,
                        bgcolor: "#555555",
                        color: "#FFFFFF",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ color: "#ff914d" }}
                      >
                        To: {kudo.recipient.username}
                      </Typography>
                      <Typography>{kudo.message}</Typography>
                      <Typography variant="caption" color="#B0B0B0">
                        {new Date(kudo.timestamp).toLocaleString()}
                      </Typography>
                    </Paper>
                  ))
                )}
              </Stack>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Home;
