import { useContext, useEffect, useState } from 'react';
import NewPost from '../../components/newpost/NewPost';
import Posts from '../../components/posts/Posts';
import axios from 'axios';
import './home.css';
import Spinner from '../../components/spinner/Spinner';
import LeftSideBar from '../../components/leftsidebar/LeftSideBar';
import RightSideBar from '../../components/rightsidebar/RightSideBar';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { user } = useContext(AuthContext);

  const addPost = async (post) => {
    try {
      const res = await axios.post('http://localhost:5000/api/posts/', post);
      setPosts([...posts, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updatePost = async (post, desc) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        userId: user._id,
        desc,
      });
      setPosts(posts.map((p) => (p._id === post._id ? { ...p, desc } : p)));
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (post) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        data: { userId: user._id },
      });
      setPosts(posts.filter((p) => p._id !== post._id));
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/posts/timeline/${user._id}`
      );
      setPosts(res.data);
      setIsLoaded(true);
    };
    fetchPosts();
  }, [user._id]);

  return (
    <>
      <Navbar />
      <div className='flex'>
        <LeftSideBar user={user} />
        <div className='content'>
          <div>
            <h2 className='px-1'>Home</h2>
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
        <RightSideBar />
      </div>
    </>
  );
};

export default Home;
