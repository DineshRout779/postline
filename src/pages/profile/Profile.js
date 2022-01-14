import './profile.css';
import Avatar from '../../components/avatar/Avatar';
import { useContext, useEffect, useState } from 'react';
import Spinner from '../../components/spinner/Spinner';
import axios from 'axios';
import Posts from '../../components/posts/Posts';
import { useParams } from 'react-router';
import LeftSideBar from '../../components/leftsidebar/LeftSideBar';
import RightSideBar from '../../components/rightsidebar/RightSideBar';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';

const Cover = ({ coverText, isEditing = false, onUpdate = (f) => f }) => {
  return (
    <div className='bgcover'>
      {isEditing ? (
        <input
          type='text'
          name='coverText'
          value={coverText}
          placeholder={'Enter your cover Intro here...'}
          onChange={onUpdate}
        />
      ) : (
        <p>{coverText}</p>
      )}
    </div>
  );
};

const Intro = ({
  user,
  currentUser,
  isOwnProfile,
  isFollowing,
  dispatch,
  isEditing = false,
  onToggle = (f) => f,
}) => {
  const [userData, setUserData] = useState({
    coverText: user.coverPic ? user.coverPic : `Hello, I'm ${user.username}`,
    username: user.username,
    email: user.email,
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const followUser = async () => {
    try {
      if (isFollowing) {
        await axios.put(
          `http://localhost:5000/api/users/${user._id}/unfollow/`,
          { userId: currentUser._id }
        );
        dispatch({ type: 'UNFOLLOW', payload: user._id });
        onToggle();
      } else {
        await axios.put(`http://localhost:5000/api/users/${user._id}/follow/`, {
          userId: currentUser._id,
        });
        dispatch({ type: 'FOLLOW', payload: user._id });
        onToggle();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async () => {
    await axios.put(`http://localhost:5000/api/users/${user._id}`, {
      userId: user._id,
      coverPic: userData.coverText,
      username: userData.username,
      email: userData.email,
    });
    onToggle();
  };

  return (
    <div>
      {isOwnProfile ? (
        <Cover
          isEditing={isEditing}
          coverText={userData.coverText}
          onUpdate={handleChange}
        />
      ) : (
        <Cover coverText={userData.coverText} />
      )}
      <div className='flex justify-between align-center px-1 avatar-wapper'>
        <Avatar />
        <div style={{ alignSelf: 'end' }}>
          {isOwnProfile ? (
            <>
              {isEditing ? (
                <>
                  <button className='btn' onClick={onToggle}>
                    cancel
                  </button>
                  <button className='btn btn-success' onClick={updateUser}>
                    save
                  </button>
                </>
              ) : (
                <>
                  <button className='btn' onClick={onToggle}>
                    edit
                  </button>
                </>
              )}
            </>
          ) : (
            <button className='btn' onClick={followUser}>
              {isFollowing ? 'Unfollow' : 'Follow'}
              {/* <Spinner s='16' /> */}
            </button>
          )}
        </div>
      </div>
      <div className='p-1'>
        {isEditing ? (
          <>
            <input
              type='text'
              name='username'
              value={userData.username}
              onChange={handleChange}
            />
            <input
              type='email'
              name='email'
              value={userData.email}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <h3>{userData.username}</h3>
            <small>{userData.email}</small>
            <p>Joined {new Date(user.createdAt).toDateString()}</p>
          </>
        )}
      </div>
    </div>
  );
};

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditing, setIsediting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { user: currentUser, dispatch } = useContext(AuthContext);

  const updatePost = async (post, desc) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        userId: currentUser._id,
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
        data: { userId: currentUser._id },
      });
      setPosts(posts.filter((p) => p._id !== post._id));
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async (id) => {
      const fetchPosts = async (userId) => {
        return await axios.get('http://localhost:5000/api/posts/');
      };
      const fetchUser = async (id) => {
        return await axios.get(`http://localhost:5000/api/users/${id}`);
      };
      const res = await Promise.all([fetchUser(id), fetchPosts(id)]);
      setUser(res[0].data);
      setIsOwnProfile(res[0].data._id === currentUser._id);
      setIsFollowing(res[0].data.followers.includes(currentUser._id));
      setPosts(res[1].data.filter((post) => post.userId === id));
      setIsLoaded(true);
    };
    fetchData(id);
    return () => {
      setUser(null);
      setPosts([]);
      setIsLoaded(false);
    };
  }, [id, currentUser._id]);

  const handleToggleEdit = () => {
    setIsediting(!isEditing);
  };

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      <Navbar />
      <div className='flex'>
        <LeftSideBar />
        <div className='content flex'>
          <div className='profile'>
            <h2 className='px-1'>Profile</h2>
            {!isLoaded ? (
              <div className='height-50'>
                <Spinner />
              </div>
            ) : (
              <div>
                {isOwnProfile ? (
                  <>
                    {isEditing ? (
                      <div>
                        <Intro
                          user={user}
                          isOwnProfile={isOwnProfile}
                          isFollowing={isFollowing}
                          isEditing={isEditing}
                          onToggle={handleToggleEdit}
                        />
                      </div>
                    ) : (
                      <div>
                        <Intro
                          user={user}
                          isOwnProfile={isOwnProfile}
                          isFollowing={isFollowing}
                          isEditing={isEditing}
                          onToggle={handleToggleEdit}
                        />
                        <div className='p-1'>
                          <h3>All posts</h3>
                          <Posts
                            posts={posts}
                            onUpdate={updatePost}
                            onDelete={deletePost}
                          />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <Intro
                        user={user}
                        currentUser={currentUser}
                        isOwnProfile={isOwnProfile}
                        dispatch={dispatch}
                        isFollowing={isFollowing}
                        onToggle={handleToggleFollow}
                      />
                      <div className='p-1'>
                        <h3>All posts</h3>
                        <Posts
                          posts={posts}
                          onUpdate={updatePost}
                          onDelete={deletePost}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <RightSideBar />
      </div>
    </>
  );
};

export default Profile;
