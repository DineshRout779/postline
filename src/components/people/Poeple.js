import { useEffect, useState } from 'react';
import Avatar from '../avatar/Avatar';

const Poeple = ({ allUsers, currentUser }) => {
  const [people, setPeople] = useState([]);
  const [followStatus, setFollowStatus] = useState(false);

  useEffect(() => {
    const getAllPeople = async (currentUser) => {
      const allPeople = allUsers.filter((user) => user._id !== currentUser._id);
      setPeople(allPeople);
    };
    getAllPeople(currentUser);
  }, []);

  const handleFollow = () => {
    setFollowStatus(!followStatus);
  };

  return (
    <div>
      <h3>People</h3>
      <ul>
        {people.map((p) => {
          return (
            <li className='flex justify-between align-center' key={p._id}>
              <div className='flex align-center'>
                <Avatar s='50' />
                <h4>{p.username}</h4>
              </div>
              <button className='btn' onClick={handleFollow}>
                {followStatus ? 'Follow' : 'Unfollow'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Poeple;
