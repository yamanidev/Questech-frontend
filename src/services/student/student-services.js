import axios from "axios";

class StudentServices {
	API_URL = "http://localhost:8080";
	token = localStorage.getItem("jwtToken");
	config = {
		headers: {
			Authorization: `Bearer ${this.token}`,
		},
	};

	getCourses(level) {
		return axios.get(this.API_URL + `/module/promo?promo=${level}`, this.config);
	}
}

export default new StudentServices();
