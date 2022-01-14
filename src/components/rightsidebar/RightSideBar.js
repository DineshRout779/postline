import Following from '../following/Following';
import Poeple from '../people/Poeple';
import './rightsidebar.css';

const allUsers = [
  {
    _id: '61dd2413cee9934ed925a6b2',
    username: 'Dinesh',
    email: 'din@gmail.com',
    password: '$2b$10$7zvM4AUvCA1qjh8411ptMOCGcWlGqZWbSZlOovT4Bc/BeoRi1gxKi',
    profilePic: '',
    coverPic: '',
    followers: ['61dd2424cee9934ed925a6b5'],
    following: ['61dd2424cee9934ed925a6b5'],
    isAdmin: false,
    createdAt: '2022-01-11T06:30:43.080Z',
    updatedAt: '2022-01-11T06:50:15.997Z',
    __v: 0,
  },
  {
    _id: '61dd2424cee9934ed925a6b5',
    username: 'Rupam',
    email: 'rupam@gmail.com',
    password: '$2b$10$A5/Apkn9iYjzwceiRg3EWeKTzaS.gAf3jkzB.Yu6yM.E3NajPv2xS',
    profilePic: '',
    coverPic: '',
    followers: ['61dd2413cee9934ed925a6b2'],
    following: ['61dd2413cee9934ed925a6b2'],
    isAdmin: false,
    createdAt: '2022-01-11T06:31:00.753Z',
    updatedAt: '2022-01-11T06:50:15.878Z',
    __v: 0,
  },
];

const currentUser = {
  _id: '61dd2413cee9934ed925a6b2',
  username: 'Dinesh',
  email: 'din@gmail.com',
  password: '$2b$10$7zvM4AUvCA1qjh8411ptMOCGcWlGqZWbSZlOovT4Bc/BeoRi1gxKi',
  profilePic: '',
  coverPic: '',
  followers: ['61dd2424cee9934ed925a6b5'],
  following: ['61dd2424cee9934ed925a6b5'],
  isAdmin: false,
  createdAt: '2022-01-11T06:30:43.080Z',
  updatedAt: '2022-01-11T06:50:15.997Z',
  __v: 0,
};

const RightSideBar = () => {
  return (
    <div className='rightbar'>
      <Poeple allUsers={allUsers} currentUser={currentUser} />
      <Following allUsers={allUsers} currentUser={currentUser} />
    </div>
  );
};

export default RightSideBar;
