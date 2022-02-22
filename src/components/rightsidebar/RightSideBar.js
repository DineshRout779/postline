import axios from 'axios';
import { useEffect, useState } from 'react';
import PeopleList from '../peoplelist/PeopleList';
import Spinner from '../spinner/Spinner';
import './rightsidebar.css';

const url = process.env.REACT_APP_API_URL;

const RightSideBar = ({ user, max }) => {
  const [findPeoplelist, setFindPeopleList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [followStatus, setFollowStatus] = useState(false);

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
      setFollowingList(res[1].data.following);
      setFollowersList(res[1].data.followers);
      setIsLoaded(true);
    };
    fetchData();
  }, [user]);

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
          />
          <h2>Following</h2>
          <PeopleList
            user={user}
            max={max}
            list={followingList}
            title='following'
          />
          <h2>Followers</h2>
          <PeopleList
            user={user}
            max={max}
            list={followersList}
            title='following'
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
