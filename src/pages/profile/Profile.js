import './profile.css';
import Avatar from '../../components/avatar/Avatar';
import { useContext, useEffect, useState } from 'react';
import Spinner from '../../components/spinner/Spinner';
import axios from 'axios';
import { useParams } from 'react-router';
import LeftSideBar from '../../components/leftsidebar/LeftSideBar';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';
import FileUpload from '../../components/fileupload/FileUpload';
import { IoMdImages } from 'react-icons/io';
import TabContainer from '../../components/tabcontainer/TabContainer';

const url = process.env.REACT_APP_API_URL;

const Cover = ({ coverText, isEditing = false, onUpdate = (f) => f }) => {
  return (
    <div className='bgcover'>
      {isEditing ? (
        <div className='form-group'>
          <input
            type='text'
            name='coverText'
            value={coverText}
            placeholder={'Enter your cover Intro here...'}
            onChange={onUpdate}
            className={'form-control'}
          />
        </div>
      ) : (
        <h3>{coverText}</h3>
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
    profilePic: user.profilePic,
    username: user.username,
    email: user.email,
    password: '',
  });

  // console.log(user);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const followUser = async (followId) => {
    try {
      const res = await axios.put(
        `${url}/users/follow/${user._id}`,
        {
          followId,
        },
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const unFollowUser = async (unfollowId) => {
    try {
      const res = await axios.put(
        `${url}/users/unfollow/${user._id}`,
        {
          unfollowId,
        },
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const updateUser = async () => {
    try {
      const res = await axios.put(
        `${url}/users/${user._id}`,
        {
          userId: user._id,
          coverPic: userData.coverText,
          username: userData.username,
          email: userData.email,
          profilePic: userData.profilePic,
        },
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      dispatch({ type: 'UPDATE_PROFILE', payload: res.data });
      onToggle();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (isFollowing && !isOwnProfile) {
  //     user.followers.length = user.followers.length + 1;
  //   } else {
  //     user.followers.length = user.followers.length - 1;
  //   }
  // }, [user.followers, isFollowing, isOwnProfile]);

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
        <Avatar
          isEditing={isEditing}
          profilePic={userData.profilePic}
          handleChange={handleChange}
        />
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
            <button
              className='btn'
              onClick={
                !isFollowing
                  ? () => followUser(user._id)
                  : () => unFollowUser(user._id)
              }
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
              {/* <Spinner s='16' /> */}
            </button>
          )}
        </div>
      </div>
      <div className='p-1'>
        {isEditing ? (
          <>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                id={'username'}
                value={userData.username}
                onChange={handleChange}
                className={'form-control'}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>email</label>
              <input
                type='email'
                name='email'
                id={'email'}
                value={userData.email}
                onChange={handleChange}
                className={'form-control'}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>
                password <small>(Leave empty if don't want to change)</small>
              </label>
              <input
                type='password'
                name='password'
                id={'password'}
                value={userData.password}
                onChange={handleChange}
                className={'form-control'}
                placeholder={'Enter new password'}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='file' className='label-icon flex align-center'>
                <FileUpload
                  img={userData.profilePic}
                  onDone={({ base64 }) =>
                    setUserData({ ...userData, profilePic: base64 })
                  }
                />
                <IoMdImages /> Upload
              </label>
            </div>
          </>
        ) : (
          <>
            <h3>{userData.username}</h3>
            <small>{userData.email}</small>
            <p>Joined {new Date(user.createdAt).toDateString()}</p>
            <div className='flex'>
              <p>
                <span className='text-bold'>{user.following.length}</span>{' '}
                Following
              </p>
              <p>
                <span className='text-bold'> {user.followers.length}</span>{' '}
                Followers
              </p>
            </div>
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
    const fetchData = async (id) => {
      const fetchPosts = async () => {
        return await axios.get(`${url}/posts/myposts/${id}`);
      };
      const fetchUser = async () => {
        return await axios.get(`${url}/users/${id}`, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
      };
      const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
      setUser(user.data);
      setIsOwnProfile(user.data._id === currentUser._id);
      setPosts(posts.data);

      !(user.data._id === currentUser._id) &&
        setIsFollowing(
          user.data.followers.some((u) => u._id === currentUser._id)
        );

      setIsLoaded(true);
    };
    fetchData(id);
  }, [id, currentUser._id, currentUser.token]);

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
            {!isLoaded ? (
              <div className='height-50'>
                <Spinner />
              </div>
            ) : (
              <div>
                {isOwnProfile ? (
                  <>
                    {isEditing ? (
                      <>
                        <Intro
                          user={user}
                          currentUser={currentUser}
                          isOwnProfile={isOwnProfile}
                          isFollowing={isFollowing}
                          isEditing={isEditing}
                          dispatch={dispatch}
                          onToggle={handleToggleEdit}
                        />
                      </>
                    ) : (
                      <>
                        <Intro
                          user={user}
                          isOwnProfile={isOwnProfile}
                          isFollowing={isFollowing}
                          isEditing={isEditing}
                          onToggle={handleToggleEdit}
                        />
                        <div className='p-1'>
                          <TabContainer
                            user={user}
                            posts={posts}
                            onUpdate={updatePost}
                            onDelete={deletePost}
                          />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Intro
                      user={user}
                      currentUser={currentUser}
                      isOwnProfile={isOwnProfile}
                      dispatch={dispatch}
                      isFollowing={isFollowing}
                      onToggle={handleToggleFollow}
                    />
                    <div className='p-1'>
                      <TabContainer
                        user={user}
                        posts={posts}
                        onUpdate={updatePost}
                        onDelete={deletePost}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
