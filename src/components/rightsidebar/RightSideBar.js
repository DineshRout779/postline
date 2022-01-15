/* eslint-disable array-callback-return */
import axios from 'axios';
import { useEffect, useState } from 'react';
import Following from '../following/Following';
import PeopleList from '../peoplelist/PeopleList';
import Spinner from '../spinner/Spinner';
import './rightsidebar.css';

const RightSideBar = ({ user, max }) => {
  const [list, setList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [followStatus, setFollowStatus] = useState(false);

  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const fetchAllPeople = async () => {
        return await axios.get(`${url}/users/`);
      };
      const fetchAllFollowing = async () => {
        return await axios.get(`${url}/users/${user._id}/following`);
      };
      const res = await Promise.all([fetchAllPeople(), fetchAllFollowing()]);
      setList(
        res[0].data.filter((p) => {
          if (p._id !== user._id && !user.following.includes(p._id)) return p;
        })
      );
      setFollowingList(res[1].data);
      setIsLoaded(true);
    };
    fetchData();
  }, [url, user]);

  // const followUser = async (id) => {
  //   try {
  //     await axios.put(`${url}/users/${id}/follow/`, { userId: user._id });
  //     setList(
  //       list.filter((u) => {
  //         if (u._id !== id && !u.followers.includes(user._id)) return u;
  //       })
  //     );
  //     dispatch({ type: 'FOLLOW', payload: user._id });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className='rightbar'>
      {isLoaded ? (
        <>
          <h2>People you may know</h2>
          <PeopleList user={user} max={max} list={list} />
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
