import { useContext, useEffect, useState } from 'react';
import NewPost from '../../components/newpost/NewPost';
import Posts from '../../components/posts/Posts';
import axios from 'axios';
import Spinner from '../../components/spinner/Spinner';
import LeftSideBar from '../../components/leftsidebar/LeftSideBar';
import RightSideBar from '../../components/rightsidebar/RightSideBar';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';
import './home.css';
import { createPost } from '../../api/post-api';

const url = process.env.REACT_APP_API_URL;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { user: currentUser } = useContext(AuthContext);

  const addPost = async (post) => {
    try {
      const newPost = await createPost(post, currentUser);
      setPosts([...posts, newPost]);
    } catch (error) {
      console.log(error.response);
    }
  };

  // post - id, currentUser -  id & token ,
  const updatePost = async (post, desc) => {
    try {
      await axios.put(
        `${url}/posts/${post._id}/${currentUser._id}`,
        {
          desc,
        },
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      setPosts(posts.map((p) => (p._id === post._id ? { ...p, desc } : p)));
      return true;
    } catch (err) {
      console.log(err.response);
    }
  };

  // post - id, currentUser -  id & token ,
  const deletePost = async (post) => {
    try {
      await axios.delete(
        `${url}/posts/${post._id}/${currentUser._id}`,
        {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        },
        { data: { postedBy: currentUser._id } }
      );
      setPosts(posts.filter((p) => p._id !== post._id));
      return true;
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      // currentUser - id
      const res = await axios.get(`${url}/posts/feed/${currentUser._id}`);
      setPosts(res.data);
      setIsLoaded(true);
    };
    fetchPosts();
  }, [currentUser._id]);

  return (
    <>
      <Navbar />
      <div className='flex'>
        <LeftSideBar />
        <div className='content'>
          <div>
            <NewPost addPost={addPost} />
            <div className='px-1 my-2'>
              <h3>Timeline</h3>
              {isLoaded ? (
                <Posts
                  posts={posts}
                  onUpdate={updatePost}
                  onDelete={deletePost}
                />
              ) : (
                <div className='height-50'>
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </div>
        <RightSideBar user={currentUser} max='5' />
      </div>
    </>
  );
};

export default Home;
