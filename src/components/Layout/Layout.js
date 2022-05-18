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
				<div className="pt-32 flex-grow">
					<Outlet />
				</div>
			</Box>
		</>
	);
}

export default Layout;
