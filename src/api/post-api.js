import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const getMyPosts = async (id) => {
  return await axios.get(`${url}/posts/myposts/${id}`);
};

const getTimelinePosts = async (id) => {
  return await axios.get(`${url}/posts/feed/${id}`);
};

const createPost = async (post, currentUser) => {
  return await axios.post(`${url}/posts/${currentUser._id}`, post);
};

const updatePost = async (postId, userId, token, desc) => {
  return await axios.put(
    `${url}/posts/${postId}/${userId}`,
    {
      desc,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const deletePost = async (postId, userId, token) => {
  return await axios.delete(
    `${url}/posts/${postId}/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    { data: { postedBy: userId } }
  );
};

const addComment = async (postId, userId, token, comment) => {
  return await axios.put(
    `${url}/posts/${postId}/comment/${userId}`,
    { text: comment },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export {
  getMyPosts,
  getTimelinePosts,
  createPost,
  updatePost,
  deletePost,
  addComment,
};
