import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../avatar/Avatar';
import './peoplelist.css';

const url = process.env.REACT_APP_API_URL;

const PeopleList = ({ list, max, message, title = 'people' }) => {
  const [user, setUser] = useState(null);

  const { user: currentUser } = useContext(AuthContext);

  const followUser = async (followId) => {
    try {
      const res = await axios.put(
        `${url}/users/follow/${user._id}`,
        {
          followId,
        },
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const unFollowUser = async (unfollowId) => {
    try {
      const res = await axios.put(
        `${url}/users/unfollow/${currentUser._id}`,
        {
          unfollowId,
        },
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    const fethcUser = async () => {
      try {
        const res = await axios.get(`${url}/users/${currentUser._id}`, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fethcUser();
  }, [currentUser]);

  return (
    <>
      <ul className='people-list'>
        {list.length > 0 ? (
          list.slice(0, max ? max : list.length).map((p) => {
            return (
              <li className='flex justify-between align-center' key={p._id}>
                <Avatar s='50' profilePic={p.profilePic} />
                <Link to={`/profile/${p._id}`}>
                  <h4>{p.username}</h4>
                </Link>
                <div className='ml-auto'>
                  <button
                    className='btn'
                    onClick={
                      user && !user.following.includes(p._id)
                        ? () => followUser(p._id)
                        : () => unFollowUser(p._id)
                    }
                  >
                    {user && !user.following.includes(p._id)
                      ? 'Follow'
                      : 'Unfollow'}
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <p>{message ? '' : 'No users found!'}</p>
        )}
      </ul>
      {list.length > max && <Link to={'people'}>View more</Link>}
      <br />
    </>
  );
};

export default PeopleList;
