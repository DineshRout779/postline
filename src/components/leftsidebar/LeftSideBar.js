import { useContext } from 'react';
import {
  MdHome,
  MdLogout,
  MdPeopleOutline,
  MdPerson,
  MdSearch,
} from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './leftsidebar.css';

const LeftSideBar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <div className='leftbar flex flex-column'>
      <NavLink
        to='/home'
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <MdHome className='icon' /> Home
      </NavLink>
      {user ? (
        <NavLink
          to={'/profile/' + user._id}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <MdPerson className='icon' /> Profile
        </NavLink>
      ) : (
        ''
      )}
      <NavLink
        to={'/findpeople'}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <MdPeopleOutline className='icon' /> People
      </NavLink>
      <NavLink
        to='/search'
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <MdSearch className='icon' /> Search
      </NavLink>
      <button className='btn-link' onClick={handleClick}>
        <MdLogout className='icon' /> Logout
      </button>
    </div>
  );
};

export default LeftSideBar;
