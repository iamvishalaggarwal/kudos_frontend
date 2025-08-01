import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice"; // adjust path if needed
import { ExitToApp, PowerOff, PowerSettingsNew } from "@mui/icons-material";

const pages = [
  { link: "/", name: "Home" },
  { link: "/users", name: "Users" },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <Box
      sx={{
        width: 250,
        bgcolor: "#f8f8f8",
        height: "100%",
        paddingTop: 2,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {pages.map((page) => (
          <ListItem key={page.name} disablePadding>
            <ListItemButton>
              <NavLink
                to={page.link}
                style={({ isActive }) => ({
                  textAlign: "center",
                  width: "100%",
                  color: isActive ? "#1976d2" : "#333",
                  textDecoration: "none",
                  fontWeight: isActive ? 600 : 400,
                  padding: "10px 16px",
                  fontSize: "1rem",
                })}
              >
                {page.name}
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                sx: {
                  textAlign: "center",
                  color: "#d32f2f",
                  fontWeight: 600,
                  fontSize: "1rem",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Box px={{ xs: 2, md: 8 }}>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Mobile Menu Icon */}
          <Box
            sx={{ display: { xs: "flex", lg: "none" }, alignItems: "center" }}
          >
            <IconButton
              size="large"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon
                sx={{
                  color: "#333",
                  transform: drawerOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              transitionDuration={400}
            >
              {drawerList()}
            </Drawer>
          </Box>

          {/* App Name */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "#1976d2",
              fontWeight: 700,
              fontSize: "1.25rem",
              display: "flex",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            KudoSphere
          </Typography>

          {/* Desktop Navigation */}
          <Box
            sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center" }}
          >
            {pages.map((page) => (
              <NavLink
                key={page.name}
                to={page.link}
                style={({ isActive }) => ({
                  color: isActive ? "#1976d2" : "#333",
                  textDecoration: "none",
                  margin: "0 16px",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "0.95rem",
                  paddingBottom: "4px",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                })}
              >
                {page.name}
              </NavLink>
            ))}

            <IconButton onClick={handleLogout} title="Click to logout">
              <PowerSettingsNew />
            </IconButton>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
