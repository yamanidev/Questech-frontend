import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "~/services/auth/auth-service";
import logo from "~/assets/logo.png";

function Appbar() {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleLogOut = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#003278" }}>
      <Toolbar className="container">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">
            <img src={logo} alt="" className="block h-16 w-16" />
          </Link>
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleProfile}
            color="inherit">
            <AccountCircle />
          </IconButton>
          <IconButton size="large" onClick={handleSettings} color="inherit">
            <Settings fontSize="small" />
          </IconButton>
          <IconButton size="large" onClick={handleLogOut} color="inherit">
            <LogoutIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
