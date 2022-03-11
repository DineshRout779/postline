import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    user && navigate('/', { replace: true });
  }, [navigate, user]);

  return (
    <div className='container full-height flex justify-center align-center flex-column row'>
      <div className='col'>
        <img src='./assets/images/welcome.svg' className='svg' alt='welcome' />
      </div>

      <div className='col'>
        <h1>Welcome</h1>
        <p>Please login to continue...</p>
        <div className='btn-group flex justify-center align-center'>
          <Link to='/login' className='btn btn-danger btn-lg'>
            Login
          </Link>
          <Link to='/register' className='btn btn-outline-danger btn-lg'>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Welcome;
