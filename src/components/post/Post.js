import './post.css';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { MdOutlineMessage } from 'react-icons/md';
import Avatar from '../avatar/Avatar';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import PostActionModal from './PostActionModal';

const url = process.env.REACT_APP_API_URL;

const Post = ({ post, onUpdate, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [description, setDescription] = useState(post.desc);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const ref = useRef();

  // check if posts belongs to the user logged in or not
  const isOwnPosts = post.postedBy._id === user._id;

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [post.likes, user._id]);

  const handleToggleLike = () => {
    try {
      axios.put(`${url}/posts/${post._id}/like/${user._id}`);
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleMenu = (e) => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  const handleUpdate = async (desc) => {
    let isUpdated = await onUpdate(post, desc);

    if (isUpdated) {
      setIsEditing(false);
      setDescription(desc);
    }
  };

  const handleDelete = async () => {
    let isDeleted = await onDelete(post);
    if (isDeleted) setIsDeleting(false);
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

  return (
    <div className='post'>
      <>
        <div className='flex-grow-1'>
          <div className='flex align-center'>
            <Avatar
              s='50'
              profilePic={
                post.postedBy.profilePic ? post.postedBy.profilePic : null
              }
            />
            <Link to={`/profile/${post.postedBy._id}`}>
              <h4>{post.postedBy.username}</h4>
            </Link>
            {isOwnPosts && (
              <button
                className='post-icon-btn option ml-auto'
                onClick={handleToggleMenu}
              >
                <BsThreeDots />
              </button>
            )}
          </div>

          <p className='desc'>{description}</p>
          <div className={'post-img'}>
            {post.img ? <img src={post.img} alt='post' /> : null}
          </div>
          <small className='text-gray text-uppercase'>
            {new Date(post.createdAt).toDateString() +
              ' | ' +
              new Date(post.createdAt).toLocaleTimeString()}
          </small>
          <div className='post-actions'>
            <div className='flex'>
              <p>{likes}</p>
              <button className='post-icon-btn' onClick={handleToggleLike}>
                {isLiked ? <IoMdHeart color={'#e94747'} /> : <IoMdHeartEmpty />}
              </button>
            </div>
            <div className='flex'>
              <p>{likes}</p>
              <button className='post-icon-btn' onClick={handleToggleLike}>
                <MdOutlineMessage />
              </button>
            </div>
          </div>
          {isMenuOpen && isOwnPosts && (
            <div className='menu' ref={ref}>
              <button onClick={handleToggleUpdate}>Update</button>
              <button onClick={handleToggleDelete}>Delete</button>
            </div>
          )}
          {isEditing ? (
            // <div className='btn-group'>
            //   <button className='btn' onClick={handleToggleUpdate}>
            //     cancel
            //   </button>
            //   <button className='btn btn-success' onClick={handleUpdate}>
            //     save
            //   </button>
            // </div>

            <PostActionModal
              action='UPDATE'
              onCancel={handleToggleUpdate}
              onConfirm={(desc) => handleUpdate(desc)}
              post={post}
            />
          ) : (
            ''
          )}
          {isDeleting ? (
            // <div className='btn-group'>
            //   <button className='btn' onClick={handleToggleDelete}>
            //     cancel
            //   </button>
            //   <button className='btn btn-danger' onClick={handleDelete}>
            //     delete
            //   </button>
            // </div>

            <PostActionModal
              action='DELETE'
              onCancel={handleToggleDelete}
              onConfirm={handleDelete}
              post={post}
            />
          ) : (
            ''
          )}
        </div>
      </>
    </div>
  );
};

export default Post;
