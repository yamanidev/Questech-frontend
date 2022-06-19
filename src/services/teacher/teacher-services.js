import axios from "axios";

class TeacherServices {
	API_URL = "http://localhost:8080";
	token = localStorage.getItem("jwtToken");
	config = {
		headers: {
			Authorization: `Bearer ${this.token}`,
		},
	};

	// Courses
	getTeacherCourses(teacherId) {
		return axios.get(this.API_URL + `/professor/${teacherId}/module`, this.config);
	}

	getCourse(codeName) {
		return axios.get(this.API_URL + `/module/${codeName}`, this.config);
	}

	// Schedule
	getSchedule(day, professorId) {
		return axios.get(this.API_URL + `/planning/${professorId}/${day}`, this.config);
	}
}

export default new TeacherServices();
