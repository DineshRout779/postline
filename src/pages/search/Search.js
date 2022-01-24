import './search.css';
// import Spinner from '../../components/spinner/Spinner';
import LeftSideBar from '../../components/leftsidebar/LeftSideBar';
import RightSideBar from '../../components/rightsidebar/RightSideBar';
import Navbar from '../../components/navbar/Navbar';
import SearchBar from '../../components/searchbar/SearchBar';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import PeopleList from '../../components/peoplelist/PeopleList';

const url = process.env.REACT_APP_API_URL;

function Search() {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);

  // debounce function to minimize frequent function calls
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const searchUser = async () => {
    try {
      const res = await axios.get(`${url}/users?username=${search}`);
      setResult(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = debounce(() => searchUser());

  const handleChange = (e) => {
    setSearch(e.target.value);
    handleSearch();
  };

  return (
    <>
      <Navbar />
      <div className='flex'>
        <LeftSideBar />
        <div className='content'>
          <div className='p-1'>
            <SearchBar value={search} onChange={handleChange} />
            <PeopleList list={result} />
          </div>
        </div>
        <RightSideBar user={user} max='5' />
      </div>
    </>
  );
}

export default Search;
