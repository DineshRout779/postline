import { Link, NavLink, useNavigate } from 'react-router-dom';
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
