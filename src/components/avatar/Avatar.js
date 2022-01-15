import './avatar.css';

const Avatar = ({ s }) => {
  return (
    <img
      src='/assets/images/avatar.jpg'
      className='avatar'
      style={{ maxWidth: `${s ? s : '80'}px` }}
      alt={'avatar'}
    />
  );
};

export default Avatar;
