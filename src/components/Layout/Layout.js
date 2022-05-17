import React from "react";
import Appbar from "../Appbar/Appbar";
import Sidebar from "../Sidebar/Sidebar";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<>
			<Appbar />
			<Box sx={{ display: "flex" }}>
				<Sidebar />
				<Outlet />
			</Box>
		</>
	);
}

export default Layout;
