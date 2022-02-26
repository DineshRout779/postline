/* eslint-disable array-callback-return */
import { useContext, useEffect, useState } from 'react';
import { findPeople, followUser, unFollowUser } from '../../api/user-api';
import LeftSideBar from '../../components/leftsidebar/LeftSideBar';
import Navbar from '../../components/navbar/Navbar';
import PeopleList from '../../components/peoplelist/PeopleList';
import Spinner from '../../components/spinner/Spinner';
import { AuthContext } from '../../context/AuthContext';

const FindPeople = () => {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const follow = async (followId) => {
    try {
      await followUser(user._id, followId, user.token);
    } catch (err) {
      console.log(err.response);
    }
  };

  const unFollow = async (unfollowId) => {
    try {
      await unFollowUser(user._id, unfollowId, user.token);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    const fetchFindPeople = async () => {
      try {
        const res = await findPeople(user._id, user._token);
        setList(res.data);
        setIsLoaded(true);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchFindPeople();
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
                    onFollow={follow}
                    onUnFollow={unFollow}
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
