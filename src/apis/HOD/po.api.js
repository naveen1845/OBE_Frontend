// frontend/src/apis/HOD/po.api.js
import api from "../../config/axiosConfig";

/**
 * PO APIs for HOD
 */

// Get all POs in HOD's department
const getPOs = () => api.get("/hod/po");

const poAPI = {
  getPOs,
};

export default poAPI;
