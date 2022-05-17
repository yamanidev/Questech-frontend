import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useState } from "react";
import Settings from "@mui/icons-material/Settings";
import authService from "../../services/auth/auth-service";
import { Link, useNavigate } from "react-router-dom";

function Appbar() {
	const navigate = useNavigate();

	const handleProfile = () => {
		navigate("/profile");
	};

	const handleSettings = () => {
		console.log("settings clicked");
	};

	const handleLogOut = () => {
		authService.logout();
		navigate("/");
	};

	return (
		<AppBar position="static" sx={{ backgroundColor: "#304FFE" }}>
			<Toolbar className="container">
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					<Link to="/">Logo</Link>
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
