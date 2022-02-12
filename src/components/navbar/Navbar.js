import { Link, NavLink } from 'react-router-dom';
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

  const handleClick = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      {user && (
        <header>
          <nav className='container nav flex justify-between align-center'>
            <Link to={'/'} className='logo'>
              Postline
            </Link>
            <div className='nav-links flex justify-between align-center'>
              {user && (
                <>
                  <NavLink
                    to='/'
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    <MdHome className='icon' />
                  </NavLink>
                  <NavLink
                    to={'/people'}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    <MdPeopleOutline className='icon' />
                  </NavLink>
                  <NavLink
                    to='/search'
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    <MdSearch className='icon' />
                  </NavLink>
                  {user ? (
                    <NavLink
                      to={'/profile/' + user._id}
                      className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                      <MdPerson className='icon' />
                    </NavLink>
                  ) : (
                    ''
                  )}
                  <button className='btn-link' onClick={handleClick}>
                    <MdLogout className='icon' />
                  </button>
                </>
              )}
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;
