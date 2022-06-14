import axios from "axios";

class AdminServices {
	API_URL = "http://localhost:8080";
	token = localStorage.getItem("jwtToken");
	config = {
		headers: {
			Authorization: `Bearer ${this.token}`,
		},
	};

	// Either Teacher or Student
	deleteUser(userId) {
		return axios.delete(this.API_URL + `/admin/user/${userId}`, this.config);
	}

	// Teachers
	getTeachers() {
		return axios.get(this.API_URL + "/admin/user/professor", this.config);
	}

	getTeacher(teacherId) {
		return axios.get(this.API_URL + `/admin/user/professor/${teacherId}`, this.config);
	}

	addTeacher(teacher) {
		return axios.post(this.API_URL + "/admin/user/professor", teacher, this.config);
	}

	editTeacher(teacherId, teacher) {
		return axios.put(
			this.API_URL + `/admin/user/professor/${teacherId}`,
			teacher,
			this.config
		);
	}

	importTeachers(formData) {
		return axios.post(
			this.API_URL + "/admin/user/professor/upload",
			formData,
			this.config
		);
	}

	// Students
	getStudents() {
		return axios.get(this.API_URL + "/admin/user/student", this.config);
	}

	getStudent(studentId) {
		return axios.get(this.API_URL + `/admin/user/student/${studentId}`, this.config);
	}

	addStudent(student) {
		return axios.post(this.API_URL + "/admin/user/student", student, this.config);
	}

	editStudent(studentId, student) {
		return axios.put(this.API_URL + `/admin/student/${studentId}`, student, this.config);
	}

	importStudents(formData) {
		return axios.post(this.API_URL + "/admin/user/student/upload", formData, this.config);
	}

	// Facilities
	getFacilities() {
		return axios.get(this.API_URL + "/admin/location", this.config);
	}

	addFacility(facility) {
		return axios.post(this.API_URL + "/admin/location", facility, this.config);
	}

	deleteFacility(facilityId) {
		return axios.delete(this.API_URL + `/admin/location/${facilityId}`, this.config);
	}

	// Groups
	getGroups(level) {
		return axios.get(this.API_URL + `/group/${level}`, this.config);
	}

	addGroup(group) {
		return axios.post(this.API_URL + "/group", group, this.config);
	}
}

export default new AdminServices();
