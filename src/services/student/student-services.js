import axios from "axios";

class StudentServices {
  API_URL = "http://localhost:8080";
  token = localStorage.getItem("jwtToken");
  config = {
    headers: {
      Authorization: `Bearer ${this.token}`,
    },
  };

  // Courses
  getCourses(level) {
    return axios.get(this.API_URL + `/module/promo?promo=${level}`, this.config);
  }

  getCourse(codeName) {
    return axios.get(this.API_URL + `/module/${codeName}`, this.config);
  }

  // Course files
  getCourseFiles(codeName, type) {
    return axios.get(this.API_URL + `/student/module/${codeName}/${type}`, this.config);
  }

  getFile(fileName, type) {
    return axios.get(this.API_URL + `/student/${type}/${fileName}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      responseType: "blob",
    });
  }

  // Schedule
  getSchedule(day, level, groupId) {
    return axios.get(this.API_URL + `/planning/${level}/${groupId}/${day}`, this.config);
  }
}

export default new StudentServices();
