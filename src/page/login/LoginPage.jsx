import React, { useEffect, useRef, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import {
  selectAccessToken,
  setCredentials,
} from "../../features/auth/authSlice";
import { setNotification } from "../../features/notification/notificationSlice";
import usePageTitle from "../../hooks/usePageTitle";

const LoginPage = () => {
  usePageTitle("Login to KudoSphere");
  const [showPassword, setShowPassword] = useState(false);
  const currAccessToken = useSelector(selectAccessToken);
  const usernameRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (currAccessToken) {
      navigate(from, { replace: true });
    }
  }, [currAccessToken, from, navigate]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        username,
        password,
      }).unwrap();
      dispatch(
        setCredentials({
          access: response.access,
        })
      );
      navigate(from, { replace: true });
    } catch {
      dispatch(
        setNotification({
          isOpen: true,
          message: "Invalid Credentials, Please try again.",
          severity: "error",
        })
      );
    }
  };

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#F8F9FF",
        color: "#2D2D2D",
        p: { xs: 2, md: 3 },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "500px",
          p: { xs: 3, md: 4 },
          bgcolor: "#FFFFFF",
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          textAlign: "center",
          mx: "auto",
        }}
      >
        <IconButton
          sx={{
            bgcolor: "#FFB400",
            color: "#FFFFFF",
            mb: 3,
            "&:hover": {
              bgcolor: "#FFAA00",
            },
          }}
        >
          <LoginOutlinedIcon />
        </IconButton>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "#2D2D2D",
            mb: 1,
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          Welcome to KudoSphere
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#555",
            mb: 3,
            fontSize: { xs: "0.9rem", md: "1rem" },
          }}
        >
          Log in to your workspace and start appreciating your team.
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="Username"
          inputRef={usernameRef}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleOutlinedIcon sx={{ color: "#6C63FF" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#E8ECEF",
              },
              "&:hover fieldset": {
                borderColor: "#A3A0FF",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6C63FF",
              },
            },
            "& .MuiInputBase-input": {
              color: "#2D2D2D",
              fontSize: { xs: "0.95rem", md: "1rem" },
            },
            mb: 2,
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyOutlinedIcon sx={{ color: "#6C63FF" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{ color: "#6C63FF" }}
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#E8ECEF",
              },
              "&:hover fieldset": {
                borderColor: "#A3A0FF",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6C63FF",
              },
            },
            "& .MuiInputBase-input": {
              color: "#2D2D2D",
              fontSize: { xs: "0.95rem", md: "1rem" },
            },
            mb: 3,
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!(username && password) || isLoading}
          sx={{
            mt: 2,
            backgroundColor: "#6C63FF",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#5A54CC",
            },
            "&:disabled": {
              backgroundColor: "#D3D3D3",
              color: "#666666",
              cursor: "not-allowed",
            },
            borderRadius: "50px",
            paddingY: "12px",
            fontSize: { xs: "0.95rem", md: "1rem" },
            fontWeight: 600,
            textTransform: "none",
            transition: "background-color 0.3s ease",
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "#6C63FF" }} />
          ) : (
            "Login Now"
          )}
        </Button>
      </Box>
    </Box>
  );
  return <>{content}</>;
};

export default LoginPage;
