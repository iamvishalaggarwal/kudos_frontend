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

  // Redirect if user is already logged in
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
          severity: "warning",
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
        bgcolor: "#323232",
        color: "#FFFFFF",
        p: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "500px",
          p: 4,
          bgcolor: "#444444",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
          mx: 2,
        }}
      >
        <IconButton
          sx={{
            bgcolor: "#FFFFFF",
            color: "#333333",
            cursor: "auto",
            mb: 2,
            "&:hover": {
              bgcolor: "#FFFFFF",
              color: "#333333",
            },
          }}
        >
          <LoginOutlinedIcon />
        </IconButton>
        <Typography variant="h5" component="h1" gutterBottom>
          Welcome to KudoSphere
        </Typography>
        <Typography variant="body2" color="#B0B0B0" gutterBottom>
          Use your username to log in to your workspace.
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          variant="standard"
          placeholder="username"
          inputRef={usernameRef}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          slotProps={{
            input: {
              style: { color: "#FFFFFF" },
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleOutlinedIcon sx={{ color: "#FFFFFF" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiInput-underline:before": {
              borderBottomColor: "#B0B0B0",
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "#ff914d",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#ff914d",
            },
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px #444444 inset",
              WebkitTextFillColor: "#FFFFFF",
            },
            mb: 2,
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="standard"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyOutlinedIcon sx={{ color: "#FFFFFF" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{ color: "#FFFFFF" }}
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
            style: { color: "#FFFFFF" },
            disableUnderline: false,
            sx: {
              fontSize: "16px",
            },
          }}
          sx={{
            "& .MuiInput-underline:before": {
              borderBottomColor: "#B0B0B0",
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "#ff914d",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#ff914d",
            },
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px #444444 inset",
              WebkitTextFillColor: "#FFFFFF",
            },
            mb: 2,
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#ff914d",
            "&:hover": {
              backgroundColor: "#FF8C00",
            },
            borderRadius: "50px",
            paddingY: "10px",
            cursor: "pointer",
            "&:disabled": {
              backgroundColor: "#B0B0B0",
              color: "#666666",
              cursor: "not-allowed",
              boxShadow: "none",
              pointerEvents: "auto",
            },
          }}
          disabled={!(username && password) || isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="warning" />
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
