import { useEffect, useState } from 'react';
import Avatar from '../avatar/Avatar';

const Following = ({ allUsers, currentUser }) => {
  const [following, setFollowing] = useState([]);
  const [followStatus, setFollowStatus] = useState(false);

  useEffect(() => {
    const getAllFollowin = async (currentUser) => {
      const allFollowing = currentUser.following.map((friendId) => {
        return allUsers.find((user) => user._id === friendId);
      });
      setFollowing(allFollowing);
    };
    getAllFollowin(currentUser);
  }, []);

  const handleFollow = () => {
    setFollowStatus(!followStatus);
  };

  return (
    <div>
      <h3>Following</h3>
      <ul>
        {following.map((p) => {
          return (
            <li className='flex justify-between align-center' key={p._id}>
              <div className='flex align-center'>
                <Avatar s='50' />
                <h4>{p.username}</h4>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Following;
