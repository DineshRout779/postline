import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const getMyPosts = async (id) => {
  try {
    const res = await axios.get(`${url}/posts/myposts/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

const getTimelinePosts = async (id) => {
  try {
    const res = await axios.get(`${url}/posts/feed/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

const createPost = async (post, currentUser) => {
  try {
    const res = await axios.post(`${url}/posts/${currentUser._id}`, post);
    return res;
  } catch (error) {
    return error;
  }
};

const updatePost = async (postId, userId, token, desc) => {
  try {
    const res = await axios.put(
      `${url}/posts/${postId}/${userId}`,
      {
        desc,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res;
  } catch (error) {
    return error;
  }
};

const deletePost = async (postId, userId, token) => {
  try {
    const res = await axios.delete(
      `${url}/posts/${postId}/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      { data: { postedBy: userId } }
    );
    return res;
  } catch (err) {
    console.log(err.response);
  }
};

export { getMyPosts, getTimelinePosts, createPost, updatePost, deletePost };
