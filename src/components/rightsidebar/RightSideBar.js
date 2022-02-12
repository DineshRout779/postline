/* eslint-disable array-callback-return */
import axios from 'axios';
import { useEffect, useState } from 'react';
import Following from '../following/Following';
import PeopleList from '../peoplelist/PeopleList';
import Spinner from '../spinner/Spinner';
import './rightsidebar.css';

const RightSideBar = ({ user, max }) => {
  const [findPeoplelist, setFindPeopleList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [followStatus, setFollowStatus] = useState(false);

  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const findPeople = async () => {
        return await axios.get(`${url}/users/findpeople/${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      };
      const fetchAllFollowing = async () => {
        return await axios.get(`${url}/users/${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      };
      const res = await Promise.all([findPeople(), fetchAllFollowing()]);
      setFindPeopleList(res[0].data);
      setFollowingList(res[1].data.following);
      setIsLoaded(true);
    };
    fetchData();
  }, [url, user]);

  return (
    <div className='rightbar'>
      {isLoaded ? (
        <>
          <h2>People you may know</h2>
          <PeopleList user={user} max={max} list={findPeoplelist} />
          <h2>Following</h2>
          <Following user={user} list={followingList} />
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
