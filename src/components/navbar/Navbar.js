import { Link, useNavigate } from 'react-router-dom';
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
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <>
      {user && (
        <header>
          <nav className='container nav flex justify-between align-center'>
            <Link to={'/'} className='logo'>
              Social
            </Link>
            <div className='nav-links flex'>
              {user && (
                <div>
                  <Link to={'/'}>
                    <MdHome className='icon' />
                  </Link>
                  <Link to={'/people'}>
                    <MdPeopleOutline className='icon' />
                  </Link>
                  <Link to={'/search'}>
                    <MdSearch className='icon' />
                  </Link>
                  <Link to={`/profile/${user._id}`}>
                    <MdPerson className='icon' />
                  </Link>
                  <button className='btn-link' onClick={handleClick}>
                    <MdLogout className='icon' />
                  </button>
                </div>
              )}
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;
