import { useState } from 'react';
import PeopleList from '../peoplelist/PeopleList';
import Posts from '../posts/Posts';

const tabs = ['Posts', 'Following', 'Followers'];

const Tab = ({ tabName, isActive, index, onTabChange }) => {
  return (
    <button
      className={isActive ? 'btn btn-tab btn-tab-active' : 'btn btn-tab border'}
      onClick={() => onTabChange(index)}
    >
      {tabName}
    </button>
  );
};

const Content = ({ index, posts, onUpdate, onDelete, user }) => {
  switch (index) {
    case 0:
      return <Posts posts={posts} onUpdate={onUpdate} onDelete={onDelete} />;
    case 1:
      return <PeopleList list={user.following} />;
    case 2:
      return <PeopleList list={user.followers} />;
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
      <div className='full-height'>
        <Content index={activeIndex} {...props} />
      </div>
    </>
  );
};

export default TabContainer;
