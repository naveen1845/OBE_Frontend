// frontend/src/apis/HOD/clo.api.js
import api from "../../config/axiosConfig";

/**
 * CLO APIs for HOD
 */

// Get CLOs for a course
const getCLOsByCourse = (courseId) => api.get(`/hod/clo/course/${courseId}`);

// Create a single CLO
const createCLO = (data) => {
  /**
   * data = {
   *   cloCode?,    // backend may auto-generate based on count
   *   description,
   *   bloomLevel,
   *   version,
   *   courseId,
   *   threshold (40–70)
   * }
   */
  return api.post("/hod/clo", data);
};

// Update an existing CLO
const updateCLO = (id, data) => api.put(`/hod/clo/${id}`, data);

// CLO-PO/PSO mapping
const mapCLOToPOPSO = (data) => api.post("/hod/clo/map", data);

// Get mapping for a course
const getCLOMappings = (courseId) => api.get(`/hod/clo/mappings/${courseId}`);

// Validate number of CLOs chosen by user (step 1 in CLO creation flow)
const validateCLOCount = (courseId, count) =>
  api.post(`/hod/course/${courseId}/clo-count`, { count });

// Save multiple CLOs in batch
const createMultipleCLOs = async (courseId, cloArray) => {
  // cloArray = [{ description, bloomLevel, threshold, version }, ...]

  const results = [];

  for (let i = 0; i < cloArray.length; i++) {
    const cloData = {
      ...cloArray[i],
      courseId,
    };

    const res = await createCLO(cloData);
    results.push(res.data);
  }

  return results;
};

const cloAPI = {
  getCLOsByCourse,
  createCLO,
  updateCLO,
  mapCLOToPOPSO,
  getCLOMappings,
  validateCLOCount,
  createMultipleCLOs,
};

export default cloAPI;
