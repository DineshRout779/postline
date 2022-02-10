import { Link } from 'react-router-dom';
import Avatar from '../avatar/Avatar';
import './peoplelist.css';

const PeopleList = ({ list, max, message, title }) => {
  return (
    <div>
      <h3>{title ? title : ''}</h3>
      <ul>
        {list.length > 0 ? (
          list.slice(0, max ? max : list.length).map((p) => {
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
          <p>{message ? '' : 'No users found!'}</p>
        )}
      </ul>
      {max && <Link to={'people'}>View more</Link>}
    </div>
  );
};

export default PeopleList;
