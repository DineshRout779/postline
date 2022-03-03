import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

export const login = async (formData) => {
  return await axios.post(`${url}/auth/login/`, formData);
};

export const register = async (formData) => {
  return await axios.post(`${url}/auth/register/`, formData);
};
