import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../avatar/Avatar';
import './newpost.css';
import FileUpload from '../fileupload/FileUpload';
import { IoMdImages } from 'react-icons/io';

const NewPost = ({ addPost }) => {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState({
    postedBy: user._id,
    desc: '',
    img: '',
  });

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPost({ postedBy: user._id, desc: '', img: '' });
    addPost(post);
  };

  return (
    <form className='flex justify-between p-1' onSubmit={handleSubmit}>
      <Avatar profilePic={user.profilePic} />
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
        {post.img ? (
          <img src={post.img} className={'post-img'} alt={'upload preview'} />
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
  );
};

export default NewPost;
