/* eslint-disable array-callback-return */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import LeftSideBar from '../../components/leftsidebar/LeftSideBar';
import Navbar from '../../components/navbar/Navbar';
import PeopleList from '../../components/peoplelist/PeopleList';
import Spinner from '../../components/spinner/Spinner';
import { AuthContext } from '../../context/AuthContext';

const url = process.env.REACT_APP_API_URL;

const FindPeople = () => {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const followUser = async (followId) => {
    try {
      await axios.put(
        `${url}/users/follow/${user._id}`,
        {
          followId,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
    } catch (err) {
      console.log(err.response);
    }
  };

  const unFollowUser = async (unfollowId) => {
    try {
      await axios.put(
        `${url}/users/unfollow/${user._id}`,
        {
          unfollowId,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    const fetchAllPeople = async () => {
      const res = await axios.get(`${url}/users/findpeople/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setList(res.data);
      setIsLoaded(true);
    };
    fetchAllPeople();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className='flex'>
        <LeftSideBar />
        <div className='content'>
          <div>
            {isLoaded ? (
              <>
                <h2 className='px-1'>People you may follow</h2>
                <div className='px-1 my-2'>
                  <PeopleList
                    user={user}
                    list={list}
                    onFollow={followUser}
                    onUnFollow={unFollowUser}
                  />
                </div>
              </>
            ) : (
              <div className='full-height flex justify-center align-center'>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FindPeople;
