import './search.css';
// import Spinner from '../../components/spinner/Spinner';
import LeftSideBar from '../../components/leftsidebar/LeftSideBar';
import RightSideBar from '../../components/rightsidebar/RightSideBar';
import Navbar from '../../components/navbar/Navbar';
import SearchBar from '../../components/searchbar/SearchBar';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import PeopleList from '../../components/peoplelist/PeopleList';

const url = process.env.REACT_APP_API_URL;

function Search() {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const res = await axios.get(`${url}/users?username=${search}`);
        setResult(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleSearch();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className='flex'>
        <LeftSideBar />
        <div className='content'>
          <h2 className='px-1'>Search</h2>
          <div className='px-1'>
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
