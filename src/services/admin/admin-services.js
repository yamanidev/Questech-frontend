import axios from "axios";

class AdminServices {
	API_URL = "http://localhost:8080";
	token = localStorage.getItem("jwtToken");
	config = {
		headers: {
			Authorization: `Bearer ${this.token}`,
		},
	};

	deleteUser(id) {
		return axios.delete(this.API_URL + `/admin/user/${id}`, this.config);
	}

	// Teachers
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
		return axios.put(this.API_URL + `/admin/user/professor/${id}`, teacher, this.config);
	}

	importTeachers(formData) {
		return axios.post(
			this.API_URL + "/admin/user/professor/upload",
			formData,
			this.config
		);
	}

	// Students
	getStudent(studentId) {
		return axios.get(this.API_URL + `/admin/user/student/${studentId}`, this.config);
	}

	getStudents() {
		return axios.get(this.API_URL + "/admin/user/student", this.config);
	}

	addStudent(student) {
		return axios.post(this.API_URL + "/admin/user/student", student, this.config);
	}

	editStudent(id, student) {
		return axios.put(this.API_URL + `/admin/student/${id}`, student, this.config);
	}

	importStudents(formData) {
		return axios.post(this.API_URL + "/admin/user/student/upload", formData, this.config);
	}
}

export default new AdminServices();
