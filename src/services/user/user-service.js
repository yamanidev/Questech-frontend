class UserService {
	getUser() {
		const user = localStorage.getItem("user");
		if (user) {
			return JSON.parse(user);
		} else {
			console.error("No user is stored");
		}
	}
}

export default new UserService();
