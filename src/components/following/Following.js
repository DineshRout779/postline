import { Link } from 'react-router-dom';
import Avatar from '../avatar/Avatar';

const Following = ({ user, list }) => {
  return (
    <div>
      <ul>
        {list.length > 0 ? (
          list.map((p) => {
            return (
              <li className='flex justify-between align-center' key={p._id}>
                <div className='flex align-center'>
                  <Avatar s='50' profilePic={p.profilePic} />
                  <Link to={`/profile/${p._id}`}>
                    <h4>{p.username}</h4>
                  </Link>
                </div>
              </li>
            );
          })
        ) : (
          <p>
            You're not following anyone.{' '}
            <Link to={'people'}>Explore people</Link>
          </p>
        )}
      </ul>
    </div>
  );
};

export default Following;
