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

  // Course files
  getCourseFiles(codeName, type) {
    return axios.get(this.API_URL + `/professor/module/${codeName}/${type}`, this.config);
  }

  addFile(codeName, title, type, formData) {
    return axios.post(
      this.API_URL + `/module/upload?title=${title}&type=${type}&moduleCode=${codeName}`,
      formData,
      this.config
    );
  }

  getFile(fileName, type) {
    return axios.get(this.API_URL + `/student/${type}/${fileName}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      responseType: "blob",
    });
  }

  deleteFile(fileId, type, codeName) {
    return axios.delete(this.API_URL + `/professor/${codeName}/${type}/${fileId}`, this.config);
  }

  // Schedule
  getSchedule(day, professorId) {
    return axios.get(this.API_URL + `/planning/${professorId}/${day}`, this.config);
  }

  // Facilities
  getAvailableFacilities(day, time) {
    return axios.get(this.API_URL + `/resources/location/${day}/${time}`, this.config);
  }
}

export default new TeacherServices();
