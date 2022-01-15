import './post.css';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import Avatar from '../avatar/Avatar';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Post = ({ post, onUpdate, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [description, setDescription] = useState(post.desc);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [postedBy, setPostedBy] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const ref = useRef();

  // check if posts belongs to the user logged in or not
  const isOwnPosts = post.userId === user._id;
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUserOfPost = async () => {
      const res = await axios.get(`${url}/users/${post.userId}`);
      setPostedBy(res.data.username);
    };
    fetchUserOfPost();
    return () => {
      setPostedBy(null);
    };
  }, [post.userId, url]);

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [post.likes, user._id]);

  const handleToggleLike = () => {
    try {
      axios.put(`${url}/posts/${post._id}/like`, {
        userId: user._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleToggleMenu = (e) => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', checkIfClickedOutside);

    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  const handleToggleUpdate = () => {
    if (isDeleting) setIsDeleting(false);
    setIsEditing(!isEditing);
    setIsMenuOpen(false);
  };

  const handleToggleDelete = () => {
    if (isEditing) setIsEditing(false);
    setIsDeleting(!isDeleting);
    setIsMenuOpen(false);
  };

  const handleUpdate = async () => {
    let isUpdated = await onUpdate(post, description);
    if (isUpdated) setIsEditing(false);
  };

  const handleDelete = async () => {
    let isDeleted = await onDelete(post);
    if (isDeleted) setIsDeleting(false);
  };

  return (
    <div className='post'>
      <Avatar s='50' />
      <div className='flex-grow-1'>
        <div className='flex justify-between align-center'>
          <Link to={`/profile/${post.userId}`}>
            <h4>{postedBy}</h4>
          </Link>
          {isOwnPosts && (
            <button className='post-icon-btn option' onClick={handleToggleMenu}>
              <BsThreeDots />
            </button>
          )}
        </div>
        <p>
          {isEditing ? (
            <textarea
              name='desc'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          ) : (
            description
          )}
        </p>
        <small className='text-gray'>
          {new Date(post.createdAt).toDateString()}
        </small>
        <div className='flex'>
          <p>{likes}</p>
          <button className='post-icon-btn' onClick={handleToggleLike}>
            {isLiked ? <IoMdHeart color={'#e94747'} /> : <IoMdHeartEmpty />}
          </button>
        </div>
        {isMenuOpen && isOwnPosts && (
          <div className='menu' ref={ref}>
            <button onClick={handleToggleUpdate}>Update</button>
            <button onClick={handleToggleDelete}>Delete</button>
          </div>
        )}
        {isEditing ? (
          <>
            <button className='btn' onClick={handleToggleUpdate}>
              cancel
            </button>
            <button className='btn btn-success' onClick={handleUpdate}>
              save
            </button>
          </>
        ) : (
          ''
        )}
        {isDeleting ? (
          <>
            <button className='btn' onClick={handleToggleDelete}>
              cancel
            </button>
            <button className='btn btn-danger' onClick={handleDelete}>
              delete
            </button>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Post;
