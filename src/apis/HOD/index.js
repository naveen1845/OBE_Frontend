import axios from "../../config/axiosConfig"

export const hodAPI = {
  getDashboardStats: (token) =>
    axios.get('/hod/dashboard/stats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
