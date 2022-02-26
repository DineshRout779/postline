import { useState } from 'react';
import { followUser, unFollowUser } from '../../api/user-api';
import PeopleList from '../peoplelist/PeopleList';
import Posts from '../posts/Posts';

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
  const follow = async (followId) => {
    try {
      await followUser(currentUser._id, followId, currentUser.token);
    } catch (err) {
      console.log(err.response);
    }
  };

  const unFollow = async (unfollowId) => {
    try {
      await unFollowUser(currentUser._id, unfollowId, currentUser.token);
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
          onFollow={follow}
          onUnFollow={unFollow}
        />
      );
    case 2:
      return (
        <PeopleList
          list={followersList}
          onFollow={follow}
          onUnFollow={unFollow}
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
