import axios from "axios";
import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:8080";

class AuthService {
	// Return an object containing the jwtToken on success, and undefined on failure
	login(email, password) {
		return axios
			.post(API_URL + "/authenticate", {
				email,
				password,
			})
			.then((response) => {
				localStorage.setItem("jwtToken", response.data.jwtToken);
				localStorage.setItem("user", JSON.stringify(response.data.user));
				return response.data;
			});
	}

	logout() {
		localStorage.removeItem("jwtToken");
		localStorage.removeItem("user");
	}

	// Return true on success, and undefined on failure
	verifyJwt(jwtToken) {
		return axios
			.post(API_URL + "/validate-token", {
				jwtToken,
			})
			.then((response) => {
				return response.data;
			})
			.catch(() => {
				console.log("Checking JWT failed");
			});
	}

	// Validates token based on expiration time
	isTokenValid(token) {
		const expirationTime = jwt_decode(token).exp;
		const isValid = expirationTime * 1000 > Date.now();
		if (!isValid) {
			localStorage.removeItem("jwtToken");
			localStorage.removeItem("user");
		}
		return isValid;
	}

	// Checks authentication based on expiration time of JWT
	isAuthn() {
		const token = localStorage.getItem("jwtToken");
		if (!token) {
			return false;
		}
		return this.isTokenValid(token);
	}
}

export default new AuthService();
