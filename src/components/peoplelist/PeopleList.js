import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../avatar/Avatar';
import Spinner from '../spinner/Spinner';
import './peoplelist.css';

const url = process.env.REACT_APP_API_URL;

const People = ({ p, user, onFollow, onUnFollow }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(user.following.some((u) => u._id === p._id));
  }, [p, user]);

  const handleFollow = (id) => {
    onFollow(id);
    setIsFollowing(true);
  };

  const handleUnFollow = (id) => {
    onUnFollow(id);
    setIsFollowing(false);
  };

  return (
    <li className='flex justify-between align-center'>
      <Avatar s='50' profilePic={p.profilePic} />
      <Link to={`/profile/${p._id}`}>
        <h4>{p.username}</h4>
      </Link>
      <div className='ml-auto'>
        {p._id !== user._id && (
          <button
            className='btn'
            onClick={
              !isFollowing
                ? () => handleFollow(p._id)
                : () => handleUnFollow(p._id)
            }
          >
            {!isFollowing ? 'Follow' : 'Following'}
          </button>
        )}
      </div>
    </li>
  );
};

const PeopleList = ({
  list,
  max,
  message,
  title = 'people',
  onFollow,
  onUnFollow,
}) => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { user: currentUser } = useContext(AuthContext);

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
        <ul className='people-list'>
          {list.length > 0 ? (
            list
              .slice(0, max ? max : list.length)
              .map((p) => (
                <People
                  p={p}
                  user={user}
                  onFollow={onFollow}
                  onUnFollow={onUnFollow}
                  key={p._id}
                />
              ))
          ) : (
            <p>{message ? '' : 'No users found!'}</p>
          )}
        </ul>
      ) : (
        <div className='height-50'>
          <Spinner />
        </div>
      )}

      {list.length > max && <Link to={'findpeople'}>View more</Link>}
      <br />
    </>
  );
};

export default PeopleList;
