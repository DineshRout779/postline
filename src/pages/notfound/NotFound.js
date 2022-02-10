import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='container full-height flex justify-center align-center flex-column'>
      <h1 className='text-big'>404</h1>
      <p>Page not found</p>
      <Link to={'/login'}>Login</Link>
    </div>
  );
};

export default NotFound;
