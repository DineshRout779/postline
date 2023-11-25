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
import { getUser } from '../../api/user-api';
import { addComment } from '../../api/post-api';
import Comment from './Comment';

const url = process.env.REACT_APP_API_URL;

const Post = ({ post, onUpdate, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [description, setDescription] = useState(post.desc);
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState(post.comments);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const ref = useRef();

  // check if posts belongs to the user logged in or not
  const isOwnPosts = post.postedBy._id === user._id;

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [post.likes, user._id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const res = await addComment(post._id, user._id, user.token, comment);

      // console.log(res);

      if (res.status === 201) {
        setAllComments(res.data.comments);
        setComment('');
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleToggleLike = () => {
    try {
      axios.put(
        `${url}/posts/${post._id}/like/${user._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
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

  useEffect(() => {
    (async () => {
      try {
        const res = await getUser(user._id, user.token);
        // console.log(res);

        if (res.status === 200) {
          setCurrentUser(res.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    })();
  }, [user._id, user.token]);

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
              <p>{allComments.length}</p>
              <button
                onClick={() => setShowComments(!showComments)}
                className='post-icon-btn'
              >
                <MdOutlineMessage />
              </button>
            </div>
          </div>
          {/* comment area */}
          {/* comments */}
          {showComments ? (
            <div className='comment-list'>
              {allComments.map((c) => (
                <Comment c={c} key={c._id} />
              ))}
            </div>
          ) : null}
          {/* comment form */}
          <div className='comment'>
            <img
              src={currentUser?.profilePic}
              alt=''
              className='comment-user'
            />
            <form onSubmit={handleAddComment} className='comment-form'>
              <textarea
                name='comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                id='comment'
                className='comment-textarea'
                placeholder='Write something...'
              ></textarea>
              <button type='submit' className='btn btn__comment'>
                Comment
              </button>
            </form>
          </div>
          {isMenuOpen && isOwnPosts && (
            <div className='menu' ref={ref}>
              <button onClick={handleToggleUpdate}>Update</button>
              <button onClick={handleToggleDelete}>Delete</button>
            </div>
          )}
          {isEditing ? (
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
