import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const createPost = async (post, currentUser) => {
  try {
    const res = await axios.post(`${url}/posts/${currentUser._id}`, post);
    return res;
  } catch (err) {
    console.log(err.response);
  }
};

// const updatePost = async (post, desc) => {
//   try {
//     await axios.put(
//       `${url}/posts/${post._id}`,
//       {
//         userId: user._id,
//         desc,
//       },
//       { headers: { Authorization: `Bearer ${user.token}` } }
//     );
//     setPosts(posts.map((p) => (p._id === post._id ? { ...p, desc } : p)));
//     return true;
//   } catch (err) {
//     console.log(err.response);
//   }
// };

// const deletePost = async (post) => {
//   try {
//     await axios.delete(`${url}/posts/${post._id}`, {
//       data: { userId: user._id },
//       headers: { Authorization: `Bearer ${user.token}` },
//     });
//     setPosts(posts.filter((p) => p._id !== post._id));
//     return true;
//   } catch (err) {
//     console.log(err.response);
//   }
// };

export { createPost };
