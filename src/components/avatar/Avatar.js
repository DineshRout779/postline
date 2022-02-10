import './avatar.css';

const Avatar = ({ s, profilePic }) => {
  return (
    <>
      <img
        src={profilePic ? profilePic : '/assets/images/avatar.jpg'}
        className='avatar'
        style={{ maxWidth: `${s ? s : '80'}px` }}
        alt={'avatar'}
      />
    </>
  );
};

export default Avatar;
