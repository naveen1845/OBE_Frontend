import axios from "../../config/axiosConfig";

export const authAPI = {
  login: (credentials) => axios.post('/auth/login', credentials),
  getProfile: () => axios.get('/auth/profile'),
};