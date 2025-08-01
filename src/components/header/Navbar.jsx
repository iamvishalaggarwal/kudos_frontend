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
      sx={{ width: 250, bgcolor: "#323232", height: "100%" }}
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
                  color: isActive ? "#ff914d" : "#ffffff",
                  textDecoration: "none",
                  fontWeight: isActive ? 700 : 400,
                  padding: "8px 16px",
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
                sx: { textAlign: "center", color: "#ff4d4d", fontWeight: 600 },
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
        backgroundColor: "#323232",
        backgroundImage: "unset",
        boxShadow: "none",
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
              color: "#fff",
              fontWeight: 700,
              display: { xs: "flex" },
              textTransform: "uppercase",
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
                  color: isActive ? "#ff914d" : "#ffffff",
                  textDecoration: "none",
                  margin: "0 20px",
                  fontWeight: isActive ? "bold" : "normal",
                  borderBottom: isActive ? "2px solid #ff914d" : "none",
                  textTransform: "uppercase",
                })}
              >
                {page.name}
              </NavLink>
            ))}

            <Button
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                color: "#ff4d4d",
                ml: 3,
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
