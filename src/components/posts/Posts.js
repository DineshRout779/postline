import Post from '../post/Post';
import './posts.css';

const Posts = ({ posts, onUpdate, onDelete }) => {
  return (
    <div className='posts'>
      {posts.length > 0 ? (
        posts
          .sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
          .map((p) => {
            return (
              <Post
                post={p}
                key={p._id}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            );
          })
      ) : (
        <p>No posts found!</p>
      )}
    </div>
  );
};

export default Posts;
