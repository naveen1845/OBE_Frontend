// frontend/src/apis/HOD/courses.api.js
import api from "../../config/axiosConfig";

/**
 * COURSE APIs for HOD
 */

const getCourses = () => api.get("/hod/courses");

const getAll = () => api.get("/hod/all-courses");

const getCourseById = (id) => api.get(`/hod/course/${id}`);

const createCourse = (data) => {
  // data must contain: code, name, description, credits, category, version, programmeId
  return api.post("/hod/course", data);
};

const updateCourse = (id, data) => api.put(`/hod/course/${id}`, data);

const deleteCourse = (id) => api.delete(`/hod/course/${id}`);

const coursesAPI = {
  getCourses,
  getAll,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};

export default coursesAPI;
