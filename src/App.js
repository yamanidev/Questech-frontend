import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import NoMatchPage from "./pages/noMatch/NoMatchPage";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route
				path="/profile"
				element={
					<RequireAuth>
						<ProfilePage />
					</RequireAuth>
				}
			/>
			<Route path="*" element={<NoMatchPage />} />
		</Routes>
	);
}

export default App;
