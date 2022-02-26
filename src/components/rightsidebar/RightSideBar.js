import axios from 'axios';
import { useEffect, useState } from 'react';
import PeopleList from '../peoplelist/PeopleList';
import Spinner from '../spinner/Spinner';
import './rightsidebar.css';

const url = process.env.REACT_APP_API_URL;

const RightSideBar = ({ user, max }) => {
  const [findPeoplelist, setFindPeopleList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const findPeople = async () => {
        return await axios.get(`${url}/users/findpeople/${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      };
      const fetchUser = async () => {
        return await axios.get(`${url}/users/${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      };
      const res = await Promise.all([findPeople(), fetchUser()]);
      setFindPeopleList(res[0].data);
      setIsLoaded(true);
    };
    fetchData();
  }, [user]);

  // follow/unfollow working
  const followUser = async (followId) => {
    try {
      console.log('following...');
      const res = await axios.put(
        `${url}/users/follow/${user._id}`,
        {
          followId,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const unFollowUser = async (unfollowId) => {
    try {
      console.log('unfollowing...');
      const res = await axios.put(
        `${url}/users/unfollow/${user._id}`,
        {
          unfollowId,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className='rightbar'>
      {isLoaded ? (
        <>
          <h2>People you may follow</h2>
          <PeopleList
            user={user}
            max={max}
            list={findPeoplelist}
            title='people'
            onFollow={followUser}
            onUnFollow={unFollowUser}
          />
        </>
      ) : (
        <div className='full-height flex justify-center align-center'>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
