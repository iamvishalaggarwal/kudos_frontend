import React, { useState } from "react";
import {
  Typography,
  Container,
  Divider,
  Stack,
  Box,
  Tabs,
  Tab,
  Card,
} from "@mui/material";
import { useGetCurrentUserQuery } from "../../features/auth/authApiSlice";

import Navbar from "../../components/header/Navbar";
import Backdrop from "../../components/backdrop/Backdrop";
import usePageTitle from "../../hooks/usePageTitle";
import { useGetKudosSummaryQuery } from "../../features/kudos/kudosApiSlice";

const Home = () => {
  usePageTitle("Home | KudoSphere");
  const [tabValue, setTabValue] = useState(0);

  const { data: userData, isLoading } = useGetCurrentUserQuery();
  const { data: kudosSummary = {}, isLoading: isKudosLoading } =
    useGetKudosSummaryQuery();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const isAnyLoading = isLoading || isKudosLoading;

  if (isAnyLoading) return <Backdrop />;

  const receivedKudos = kudosSummary?.receive || [];
  const givenKudos = kudosSummary?.given || [];

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
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              color: "#2D2D2D",
              mb: { xs: 3, md: 4 },
              fontWeight: 700,
              textAlign: { xs: "center", md: "left" },
              fontSize: { xs: "2rem", md: "2.5rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Welcome, {userData?.username || "User"}
          </Typography>

          <Stack spacing={4}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                flexDirection: "row",
              }}
            >
              <Card
                elevation={2}
                sx={{
                  p: { xs: 2, md: 3 },
                  bgcolor: "#FFFFFF",
                  flex: 1,
                  borderRadius: 3,
                  border: "1px solid #E8ECEF",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: "#6C63FF",
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                  }}
                >
                  Your Organization
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#2D2D2D",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                  }}
                >
                  {userData?.organization || "Not specified"}
                </Typography>
              </Card>

              <Card
                elevation={2}
                sx={{
                  p: { xs: 2, md: 3 },
                  flex: 1,
                  bgcolor: "#FFFFFF",
                  borderRadius: 3,
                  border: "1px solid #E8ECEF",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: "#6C63FF",
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                  }}
                >
                  Kudos Remaining This Week
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    color: "#FFB400",
                    fontWeight: 700,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    lineHeight: 1.2,
                  }}
                >
                  {userData?.rem_kudos ?? 0}
                </Typography>
              </Card>
            </Box>

            {/* TABS */}
            <Card
              elevation={2}
              sx={{
                p: { xs: 2, md: 3 },
                bgcolor: "#FFFFFF",
                borderRadius: 3,
                border: "1px solid #E8ECEF",
              }}
            >
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                textColor="inherit"
                variant="fullWidth"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#6C63FF",
                    height: "3px",
                  },
                }}
                sx={{
                  mb: 3,
                  "& .MuiTab-root": {
                    fontWeight: 600,
                    color: "#2D2D2D",
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    textTransform: "none",
                    padding: "12px 16px",
                    transition: "color 0.2s ease-in-out",
                  },
                  "& .Mui-selected": {
                    color: "#6C63FF",
                  },
                }}
              >
                <Tab label="Received Kudos" />
                <Tab label="Given Kudos" />
              </Tabs>

              <Divider sx={{ bgcolor: "#E8ECEF", mb: 3 }} />

              {/* RECEIVED KUDOS */}
              {tabValue === 0 && (
                <Box
                  sx={{
                    maxHeight: "350px",
                    overflowY: "auto",
                    pr: 1,
                  }}
                >
                  <Stack spacing={2}>
                    {receivedKudos.length === 0 ? (
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#555",
                          textAlign: "center",
                          py: 2,
                          fontSize: { xs: "0.9rem", md: "1rem" },
                        }}
                      >
                        No kudos received yet. Share some love to get some back!
                      </Typography>
                    ) : (
                      receivedKudos.map((kudo) => (
                        <Card
                          key={kudo.id}
                          sx={{
                            p: 2,
                            bgcolor: "#F8F9FF",
                            border: "1px solid #E8ECEF",
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{
                              color: "#6C63FF",
                              mb: 0.5,
                              fontSize: { xs: "1rem", md: "1.1rem" },
                            }}
                          >
                            From: {kudo.username}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#2D2D2D",
                              mb: 1,
                              fontSize: { xs: "0.9rem", md: "1rem" },
                            }}
                          >
                            {kudo.message}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#888",
                              fontSize: { xs: "0.75rem", md: "0.8rem" },
                            }}
                          >
                            {new Date(kudo.timestamp).toLocaleString()}
                          </Typography>
                        </Card>
                      ))
                    )}
                  </Stack>
                </Box>
              )}

              {/* SENT KUDOS */}
              {tabValue === 1 && (
                <Box
                  sx={{
                    maxHeight: "350px",
                    overflowY: "auto",
                    pr: 1,
                  }}
                >
                  <Stack spacing={2}>
                    {givenKudos.length === 0 ? (
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#555",
                          textAlign: "center",
                          py: 2,
                          fontSize: { xs: "0.9rem", md: "1rem" },
                        }}
                      >
                        You haven't sent any kudos yet. Start appreciating!
                      </Typography>
                    ) : (
                      givenKudos.map((kudo) => (
                        <Card
                          key={kudo.id}
                          sx={{
                            p: 2,
                            bgcolor: "#F8F9FF",
                            border: "1px solid #E8ECEF",
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{
                              color: "#6C63FF",
                              mb: 0.5,
                              fontSize: { xs: "1rem", md: "1.1rem" },
                            }}
                          >
                            To: {kudo.username}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#2D2D2D",
                              mb: 1,
                              fontSize: { xs: "0.9rem", md: "1rem" },
                            }}
                          >
                            {kudo.message}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#888",
                              fontSize: { xs: "0.75rem", md: "0.8rem" },
                            }}
                          >
                            {new Date(kudo.timestamp).toLocaleString()}
                          </Typography>
                        </Card>
                      ))
                    )}
                  </Stack>
                </Box>
              )}
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Home;
