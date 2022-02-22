import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const getUser = async (id, token, currentUser) => {
  try {
    const res = await axios.get(`${url}/users/${id}`, {
      headers: { Authorization: `Bearer ${currentUser.token}` },
    });
    return res.data;
  } catch (error) {}
};

const findPeople = async (params, token, signal, user) => {
  try {
    let res = await axios.get(`${url}/users/findpeople/${user._id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const fetchAllFollowing = async (user) => {
  try {
    let res = await axios.get(`${url}/users/${user._id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { getUser, findPeople, fetchAllFollowing };

// headers: {
//     Authorization: 'Bearer ' + token,
//   },
