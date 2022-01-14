import { useContext } from 'react';
import { MdHome, MdLogout, MdPerson, MdSearch } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './leftsidebar.css';

const LeftSideBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className='leftbar flex flex-column'>
      <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')}>
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
        to='/search'
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <MdSearch className='icon' /> Search
      </NavLink>
      <NavLink to={`/login`}>
        <MdLogout className='icon' /> Logout
      </NavLink>
    </div>
  );
};

export default LeftSideBar;
