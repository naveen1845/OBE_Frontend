// frontend/src/apis/HOD/programmes.api.js
import api from "../../config/axiosConfig";

const getProgrammes = () => api.get("/hod/programmes");
const getProgrammeById = (id) => api.get(`/hod/programmes/${id}`);
const createProgramme = (data) => api.post("/hod/programmes", data);
const updateProgramme = (id, data) => api.put(`/hod/programmes/${id}`, data);
const deleteProgramme = (id) => api.delete(`/hod/programmes/${id}`);

const programmesAPI = {
  getProgrammes,
  getProgrammeById,
  createProgramme,
  updateProgramme,
  deleteProgramme,
};

export default programmesAPI;
