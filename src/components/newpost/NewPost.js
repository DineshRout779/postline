import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../avatar/Avatar';
import './newpost.css';

const NewPost = ({ addPost }) => {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState({
    userId: user._id,
    desc: '',
  });

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPost({ userId: user._id, desc: '' });
    addPost(post);
  };

  return (
    <form className='flex px-1' onSubmit={handleSubmit}>
      <Avatar />
      <div style={{ flexGrow: 1 }}>
        <h4>Hey {user ? user.username.split(' ')[0] : 'User'}!</h4>
        <textarea
          name='desc'
          id='desc'
          placeholder="What's on your mind?"
          maxLength='600'
          onChange={handleChange}
          value={post.desc}
        ></textarea>
        <button className='btn'>Post</button>
      </div>
    </form>
  );
};

export default NewPost;
