import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

export const login = async (formData) => {
  try {
    const res = await axios.post(`${url}/auth/login/`, formData);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const register = async (formData) => {
  try {
    const res = await axios.post(`${url}/auth/register/`, formData);
    return res;
  } catch (error) {
    return error.response;
  }
};
