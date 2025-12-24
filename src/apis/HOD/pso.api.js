// frontend/src/apis/HOD/pso.api.js
import api from "../../config/axiosConfig";

/**
 * PSO APIs for HOD
 */

// Get all PSOs in HOD's department
const getPSOs = () => api.get("/hod/pso");

const psoAPI = {
  getPSOs,
};

export default psoAPI;
