import { useContext, useEffect, useState } from 'react';
import NewPost from '../../components/newpost/NewPost';
import Posts from '../../components/posts/Posts';
import Spinner from '../../components/spinner/Spinner';
import LeftSideBar from '../../components/leftsidebar/LeftSideBar';
import RightSideBar from '../../components/rightsidebar/RightSideBar';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';
import './home.css';
import {
  createPost,
  deletePost,
  getTimelinePosts,
  updatePost,
} from '../../api/post-api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { user: currentUser } = useContext(AuthContext);

  const onaddPost = async (post) => {
    try {
      const { data } = await createPost(post, currentUser);
      setPosts([...posts, data]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const onUpdatePost = async (post, desc) => {
    try {
      await updatePost(post._id, currentUser._id, currentUser.token, desc);
      setPosts(posts.map((p) => (p._id === post._id ? { ...p, desc } : p)));
      return true;
    } catch (err) {
      console.log(err.response);
    }
  };

  const onDeletePost = async (post) => {
    try {
      await deletePost(post._id, currentUser._id, currentUser.token);
      setPosts(posts.filter((p) => p._id !== post._id));
      return true;
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getTimelinePosts(currentUser._id);
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
            <NewPost addPost={onaddPost} />
            <div className='px-1 my-2'>
              <h3>Timeline</h3>
              {isLoaded ? (
                <Posts
                  posts={posts}
                  onUpdate={onUpdatePost}
                  onDelete={onDeletePost}
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
