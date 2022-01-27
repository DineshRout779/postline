import './search.css';
import LeftSideBar from '../../components/leftsidebar/LeftSideBar';
import RightSideBar from '../../components/rightsidebar/RightSideBar';
import Navbar from '../../components/navbar/Navbar';
import SearchBar from '../../components/searchbar/SearchBar';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import PeopleList from '../../components/peoplelist/PeopleList';
import debounce from 'lodash.debounce';
import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

function Search() {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);

  // debounce function to minimize frequent function calls
  const searchUser = async (search) => {
    console.log(search);
    try {
      const res = await axios.get(`${url}/users?username=${search}`);
      setResult(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(searchUser, 500), [search]);

  useEffect(() => {
    if (search.length > 0) debouncedSearch(search);
    return () => {
      debouncedSearch.cancel();
    };
  }, [search, debouncedSearch]);

  return (
    <>
      <Navbar />
      <div className='flex'>
        <LeftSideBar />
        <div className='content'>
          <div className='p-1'>
            <SearchBar value={search} onChange={handleChange} />
            <PeopleList list={result} message={'no-message'} />
          </div>
        </div>
        <RightSideBar user={user} max='5' />
      </div>
    </>
  );
}

export default Search;
