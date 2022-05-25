import axios from "axios";

class AdminServices {
	API_URL = "http://localhost:8080";
	token = localStorage.getItem("jwtToken");
	config = {
		headers: {
			Authorization: `Bearer ${this.token}`,
		},
	};

	getTeacher(teacherId) {
		return axios.get(this.API_URL + `/admin/user/professor/${teacherId}`, this.config);
	}

	getTeachers() {
		return axios.get(this.API_URL + "/admin/user/professor", this.config);
	}

	addTeacher(teacher) {
		return axios.post(this.API_URL + "/admin/user/professor", teacher, this.config);
	}

	editTeacher(id, teacher) {
		return axios.put(this.API_URL + `/admin/user/${id}`, teacher, this.config);
	}

	deleteUser(id) {
		return axios.delete(this.API_URL + `/admin/user${id}`, this.config);
	}
}

export default new AdminServices();
