import axios from 'axios';
import { useState } from 'react';
import PeopleList from '../peoplelist/PeopleList';
import Posts from '../posts/Posts';

const url = process.env.REACT_APP_API_URL;

const tabs = ['Posts', 'Following', 'Followers'];

const Tab = ({ tabName, isActive, index, onTabChange }) => {
  return (
    <button
      className={isActive ? 'btn btn-tab btn-tab-active' : 'btn btn-tab '}
      onClick={() => onTabChange(index)}
    >
      {tabName}
    </button>
  );
};

const Content = ({
  index,
  posts,
  onUpdate,
  onDelete,
  user,
  currentUser,
  followersList,
  followingList,
}) => {
  const followUser = async (followId) => {
    try {
      await axios.put(
        `${url}/users/follow/${currentUser._id}`,
        {
          followId,
        },
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
    } catch (err) {
      console.log(err.response);
    }
  };

  const unFollowUser = async (unfollowId) => {
    try {
      await axios.put(
        `${url}/users/unfollow/${currentUser._id}`,
        {
          unfollowId,
        },
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
    } catch (err) {
      console.log(err.response);
    }
  };

  switch (index) {
    case 0:
      return <Posts posts={posts} onUpdate={onUpdate} onDelete={onDelete} />;
    case 1:
      return (
        <PeopleList
          list={followingList}
          onFollow={followUser}
          onUnFollow={unFollowUser}
        />
      );
    case 2:
      return (
        <PeopleList
          list={followersList}
          onFollow={followUser}
          onUnFollow={unFollowUser}
        />
      );
    default:
      return <Posts posts={posts} onUpdate={onUpdate} onDelete={onDelete} />;
  }
};

const TabContainer = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className='tab-container flex'>
        {tabs.map((tab, index) => (
          <Tab
            tabName={tab}
            key={index}
            isActive={activeIndex === index}
            onTabChange={() => handleTabChange(index)}
          />
        ))}
      </div>
      <div className='half-height'>
        <Content index={activeIndex} {...props} />
      </div>
    </>
  );
};

export default TabContainer;
