import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../avatar/Avatar';
import './newpost.css';
import FileUpload from '../fileupload/FileUpload';
import { IoMdImages } from 'react-icons/io';
import axios from 'axios';
import Spinner from '../spinner/Spinner';

const url = process.env.REACT_APP_API_URL;

const NewPost = ({ addPost }) => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const [post, setPost] = useState({
    postedBy: currentUser._id,
    desc: '',
    img: '',
  });

  const handleChange = (e) => {
    setErrorMsg('');
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (post.desc !== '' || post.img !== '') {
      setPost({ postedBy: user._id, desc: '', img: '' });
      addPost(post);
    } else {
      setErrorMsg('Please input texts or image');
    }
  };

  useEffect(() => {
    const fethcUser = async () => {
      try {
        const res = await axios.get(`${url}/users/${currentUser._id}`, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        setUser(res.data);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fethcUser();
  }, [currentUser]);

  return (
    <>
      {isLoaded ? (
        <form className='flex justify-between p-1' onSubmit={handleSubmit}>
          <Avatar profilePic={user.profilePic ? user.profilePic : null} />
          <div style={{ flexGrow: 1 }}>
            <h4>Hey {user ? user.username.split(' ')[0] : 'User'}!</h4>
            <textarea
              name='desc'
              id='desc'
              placeholder="What's on your mind?"
              maxLength='1000'
              onChange={handleChange}
              value={post.desc}
              className={'form-control textarea'}
            ></textarea>
            {errorMsg}
            {post.img ? (
              <img
                src={post.img}
                className={'post-img'}
                alt={'upload preview'}
              />
            ) : (
              ''
            )}
            <div className='flex justify-between align-center my-1'>
              <label htmlFor='file' className='label-icon flex align-center'>
                <FileUpload
                  img={post.img}
                  onDone={({ base64 }) => setPost({ ...post, img: base64 })}
                />
                <IoMdImages /> <span>Upload</span>
              </label>

              <button className='btn'>Post</button>
            </div>
          </div>
        </form>
      ) : (
        <div className='height-50'>
          <Spinner />
        </div>
      )}
    </>
  );
};

export default NewPost;
