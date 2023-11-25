import { Link } from 'react-router-dom';

const Comment = ({ c }) => {
  return (
    <div className='comment-item' key={c._id}>
      <img src={c?.postedBy.profilePic} alt='' className='comment-user' />

      <div className='comment-desc'>
        <div className='flex comment-desc-header'>
          <Link to={`/profile/${c.postedBy._id}`} className='comment-username'>
            {c.postedBy.username}
          </Link>
          <p className='text-gray'>{new Date(c.createdAt).toDateString()}</p>
        </div>
        <small className='comment-text'>{c.text}</small>
      </div>
    </div>
  );
};

export default Comment;
