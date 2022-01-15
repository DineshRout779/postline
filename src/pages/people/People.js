/* eslint-disable array-callback-return */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import LeftSideBar from '../../components/leftsidebar/LeftSideBar';
import Navbar from '../../components/navbar/Navbar';
import PeopleList from '../../components/peoplelist/PeopleList';
import Spinner from '../../components/spinner/Spinner';
import { AuthContext } from '../../context/AuthContext';

const People = () => {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchAllPeople = async () => {
      const res = await axios.get(`${url}/users/`);
      setList(
        res.data.filter((p) => {
          if (p._id !== user._id && !user.following.includes(p._id)) return p;
        })
      );
      setIsLoaded(true);
    };
    fetchAllPeople();
  }, [url, user]);

  return (
    <>
      <Navbar />
      <div className='flex'>
        <LeftSideBar />
        <div className='content'>
          <div>
            {isLoaded ? (
              <>
                <h2 className='px-half'>People you may follow</h2>
                <div className='px-1 my-2'>
                  <PeopleList user={user} list={list} />
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

export default People;
