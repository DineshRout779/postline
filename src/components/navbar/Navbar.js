import { Link } from 'react-router-dom';
import {
  MdHome,
  MdLogout,
  MdPeopleOutline,
  MdPerson,
  MdSearch,
} from 'react-icons/md';
import './navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <header>
      <nav className='container nav flex justify-between align-center'>
        <Link to={'/'} className='logo'>
          Social
        </Link>
        {/* <SearchBar /> */}
        <div className='nav-links flex'>
          <Link to={'/'}>
            <MdHome className='icon' />
          </Link>
          <Link to={'/people'}>
            <MdPeopleOutline className='icon' />
          </Link>
          <Link to={'/search'}>
            <MdSearch className='icon' />
          </Link>
          {user ? (
            <Link to={`/profile/${user._id}`}>
              <MdPerson className='icon' />
            </Link>
          ) : (
            ''
          )}
          <Link to={`/login`}>
            <MdLogout className='icon' />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
