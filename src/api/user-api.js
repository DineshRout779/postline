import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const getUser = async (id, token) => {
  try {
    const res = await axios.get(`${url}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    return error;
  }
};

const findPeople = async (id, token) => {
  try {
    let res = await axios.get(`${url}/users/findpeople/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    return error;
  }
};

const updateUser = async (id, data, token) => {
  try {
    const res = await axios.put(
      `${url}/users/${id}`,
      {
        userId: id,
        coverPic: data.coverText,
        username: data.username,
        email: data.email,
        profilePic: data.profilePic,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res;
  } catch (error) {
    return error;
  }
};

const deleteUser = async () => {};

const followUser = async (id, followId, token) => {
  try {
    const res = await axios.put(
      `${url}/users/follow/${id}`,
      {
        followId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res;
  } catch (error) {
    return error;
  }
};

const unFollowUser = async (id, unfollowId, token) => {
  try {
    const res = await axios.put(
      `${url}/users/unfollow/${id}`,
      {
        unfollowId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res;
  } catch (error) {
    return error;
  }
};

const searchUser = async (searchTerm) => {
  try {
    const res = await axios.get(`${url}/users?username=${searchTerm}`);
    return res;
  } catch (error) {
    return error;
  }
};

export {
  getUser,
  findPeople,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
  searchUser,
};

// headers: {
//     Authorization: 'Bearer ' + token,
//   },
